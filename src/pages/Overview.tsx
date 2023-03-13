import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Button/PrimaryButton";
import FormField from "../components/FormField";
import Table from "../components/Table/Table";
import * as Yup from "yup";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../utils/firbase";
import Toast from "../components/UI/Toast";
import { v4 } from "uuid";
type Props = {};

const Overview = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>();
  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Remove image
  const removeSelectedImage = () => {
    setSelectedImage(undefined);
  };

  // Initial form data
  const initialValues = {
    caption: "",
    image: "",
    gallery: "",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // onSubmit
  const onSubmit = async (
    values: { caption: string; image: any; gallery: string },
    { resetForm }: any
  ) => {
    const str = values.caption.replace(/\s+/g, "-").toLowerCase();

    try {
      const imageRef = ref(
        storage,
        `images/${values.gallery}/${str + "_" + v4()}`
      );
      setLoading(true);
      const result = await uploadBytes(imageRef, values.image);
      if (result) {
        resetForm();
        setSuccess(true);
        removeSelectedImage();
      } else {
        setError("Error uploading image. Try again later");
      }
    } catch (error: any) {
      setError("Error uploading image. Try again later");
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div className="h-full mt-[64px] min-h-[90vh] px-4 grid gap-y-6 md:gap-12 md:px-8   relative ">
      <div className="h-full relative md:max-h-[60vh] overflow-scroll">
        <Table />
      </div>
      <div className=" px-5 pb-8  relative  h-full overflow-scroll bg-slate-100">
        <h2 className="text-base md:text-xl mb-2 font-semibold sticky top-0 py-5  ">
          Upload Image
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="max-w-2xl mx-auto">
              <div className=" mt-6 mb-4 grid">
                {!selectedImage && (
                  <label
                    htmlFor="image"
                    className=" grid grid-cols-[auto_1fr] hover:cursor-pointer  items-center gap-x-2 place-self-center mt-3 w-fit rounded text-base py-3 text-sm px-3 bg-black text-white "
                  >
                    <BsFillCloudUploadFill />
                    Select image{" "}
                  </label>
                )}
                <input
                  className=" hidden"
                  // name="photo_url"
                  id="image"
                  type="file"
                  accept="image/png, image/jpeg"
                  onClick={(event: any) => {
                    event.target.value = null;
                  }}
                  onChange={(event: any) => {
                    imageChange(event);
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  // onChange={imageChange}
                />

                {((selectedImage && selectedImage.type === "image/png") ||
                  (selectedImage && selectedImage.type === "image/jpeg")) && (
                  <>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt=""
                      className="mt-3  h-36 md:h-48 mx-auto"
                    />
                    <button
                      className="text-primary flex items-center gap-x-1 mt-2 mx-auto"
                      type="button"
                      onClick={() => {
                        removeSelectedImage();
                        setFieldValue("image", "");
                      }}
                    >
                      <MdDeleteOutline className=" w-5 h-5" />
                    </button>
                  </>
                )}
                {((selectedImage && selectedImage.type === "application/pdf") ||
                  (selectedImage &&
                    selectedImage.type === "application/vnd.ms-excel")) && (
                  <>
                    <p className="text-center ">{selectedImage.name}</p>
                    <button
                      className="text-primary flex items-center gap-x-1 mt-2 mx-auto"
                      type="button"
                      onClick={() => {
                        removeSelectedImage();
                        setFieldValue("image", "");
                      }}
                    >
                      <MdDeleteOutline className=" w-5 h-5" />
                    </button>
                  </>
                )}
                {errors.image && (
                  <p className="text-red-700 text-center text-xs mt-1 ">
                    {errors.image}
                  </p>
                )}
              </div>

              <FormField
                name="caption"
                title="Caption*"
                type="text"
                error={!!(errors.caption && touched.caption)}
              />
              <div className=" relative mb-6">
                <label
                  className="   mb-1 text-xs md:text-sm font-medium "
                  htmlFor={"gallery"}
                >
                  Gallery Section
                </label>
                <Field
                  className={`${
                    errors.gallery && touched.gallery ? "bg-red-200" : ""
                  } "block w-full border h-12  pl-3 rounded focus:outline-none"`}
                  name={"gallery"}
                  id={"gallery"}
                  as="select"
                  // placeholder={props.placeholder}
                >
                  <option value="">Select</option>
                  <option value="what-is-climate-change">
                    What is climate change
                  </option>
                  <option value="how-did-climate-change-happen">
                    How did climate change happen
                  </option>
                  <option value="how-can-we-help-using-mothers-mental-health">
                    How can we help using mothers mental health
                  </option>
                </Field>
                <p className="text-red-700 text-xs mt-1 ">
                  <ErrorMessage name="gallery" />
                </p>
              </div>
              <PrimaryButton
                text="Upload"
                disable={loading}
                loading={loading}
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
      {(error || success) && (
        <Toast
          success={success}
          close={() => {
            setError(null);
            setSuccess(false);
          }}
          message={error ? error : "Image uploaded successfully"}
        />
      )}
    </div>
  );
};

export default Overview;

const validation = Yup.object({
  caption: Yup.string()
    .required("Required")
    .min(5, "must be at least 5 characters"),
  gallery: Yup.string().required("Required"),
  image: Yup.mixed()
    .required("Kindly select an image")
    .test(
      "FILE_SIZE",
      "File must not exceed 2MB.",
      (value) => !value || (value && value.size <= 2000000)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format.",
      (value) =>
        !value ||
        (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
    ),
});
