import React, { useContext } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { AiFillDelete } from "react-icons/ai";
import LoadingSpinner from "./UI/LoadingSpinner";
import { AuthContext } from "../utils/AuthContext";

type Props = {
  src: string;
  caption?: string;
  onClick: () => void;
  delete: () => void;
  id: string;
  deleting: boolean;
};

const Images = (props: Props) => {
  const { admin } = useContext(AuthContext);
  return (
    <figure className={`hover:cursor-pointer boxInner relative`}>
      <img
        onClick={props.onClick}
        src={props.src}
        alt={props.caption}
        className={`w-full h-full object-cover`}
        loading={"lazy"}
      />
      {props.caption !== "" && (
        <div className="overlay" onClick={props.onClick}>
          <figcaption className="text-center break-all capitalize">
            {props.caption}
          </figcaption>
        </div>
      )}
      {admin && (
        <button
          disabled={props.deleting}
          type="button"
          onClick={() => props.delete()}
          className="absolute z-1 bottom-4 text-red-700 bg-white p-2 rounded-full right-4"
        >
          {props.deleting ? <LoadingSpinner /> : <AiFillDelete />}
        </button>
      )}
    </figure>
  );
};

export default Images;
