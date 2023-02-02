import { Link } from "react-router-dom";
import PrimaryButton from "../../Button/PrimaryButton";
import "./Slide.css";

type Props = {
  className: string;
  slide: {
    img2?: string;
    subtitle: string;
    title: string;
    link: string;
    img: string;
    position: number;
    class: string;
    btntext: string;
  };
  pos: number;
};

const Slide = (props: Props) => {
  const imageStyle = {
    backgroundImage: ` url(${props.slide.img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    //   backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "85vh",
  };
  return (
    <div className={props.className}>
      {props.slide.img2 && (
        <div className="img2">
          <img
            loading={props.slide.position === 1 ? "eager" : "lazy"}
            src={props.slide.img2}
            alt=""
          />
        </div>
      )}
      <div className="slidecont  md:ml-8 lg:ml-12">
        <div className="slidetitles max-w-[280px] md:max-w-[400px]">
          <h2 className="font-bold text-xl md:text-2xl lg:text-3xl ">
            {props.slide.subtitle}
          </h2>
          <h1>{props.slide.title}</h1>
        </div>
        <Link
          className="  max-w-[280px] md:max-w-[400px]"
          to={props.slide.link}
        >
          <PrimaryButton type="button" text={props.slide.btntext} />
        </Link>
      </div>
      {/* <img src={props.slide.img} alt="" /> */}
      <div
        style={imageStyle}
        className="absolute  h-full  w-full place-content-center  "
      >
        <div className="layer"></div>
      </div>
    </div>
  );
};
export default Slide;
