import { addDoc, collection, doc, getDoc, getDocs, query } from "@firebase/firestore";
import axios from "axios";
import { db } from "../utils/firbase";
import { BACKEND_URL } from "../utils/utils";

// export const createUser = async (data: { 
// first_name: string,
// last_name: string,
// category?: string | null,
// email: string,
// date: string
// }) => {
//     try {
//       const response = await axios.post(
//         BACKEND_URL + `/users.json`,
//         data
  
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${data.token}`,
//         //   },
//         // }
//       );
//       //
//       console.log(response)
//       return response.data;
//     } catch (err: any) {
//       if (!err.response) {
//         return err;
//       }
  
//       return err.response.data;
//     }
//   };
export const createUser = async (data: { 
first_name: string,
last_name: string,
category?: string | null,
email: string,
date: string
}) => {
    try {
      const response = await addDoc(collection(db, "users"), data);

      //

      return response.id;
    } catch (err: any) {
      // if (!err.response) {
      //   return err;
      // }
  
      return err;
    }
  };

  export const signIn = async (data: { 
    email: string,
    time_stamp: string,
    }) => {
      try {
        const response = await addDoc(collection(db, "signIn"), data);
  
        //
  
        return response.id;
      } catch (err: any) {
        // if (!err.response) {
        //   return err;
        // }
    
        return err;
      }
      };