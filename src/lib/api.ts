import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

export const createUser = async (data: { 
first_name: string,
last_name: string,
category?: string | null,
email: string,
date: string
}) => {
    try {
      const response = await axios.post(
        BACKEND_URL + `/users.json`,
        data
  
        // {
        //   headers: {
        //     Authorization: `Bearer ${data.token}`,
        //   },
        // }
      );
      //
      console.log(response)
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        return err;
      }
  
      return err.response.data;
    }
  };

  export const signIn = async (data: { 
    email: string,
    time_stamp: string,
    }) => {
        try {
          const response = await axios.post(
            BACKEND_URL + `/sign-in.json`,
            data
          );
          //
          console.log(response)
          return response.data;
        } catch (err: any) {
          if (!err.response) {
            return err;
          }
      
          return err.response.data;
        }
      };