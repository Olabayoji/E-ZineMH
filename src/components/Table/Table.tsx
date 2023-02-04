import { collection, getDocs } from "@firebase/firestore";
import React, { useEffect, useRef, useState } from "react";

import { db } from "../../utils/firbase";
import LoadingScreen from "../UI/LoadingScreen";
import Toast from "../UI/Toast";
import TableRows from "./TableRows";

type Props = {};

const Table = (props: Props) => {
  const effectRan = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | any>(false);
  const [latest, setLatest] = useState<any>([]);
  const list: any[] = [];
  const getLatestSignIn = async () => {
    setLoading(true);
    try {
      const docRef = collection(db, "signIn");
      const docSnap = await getDocs(docRef);
      console.log(docSnap);
      if (docSnap && docSnap.docs.length > 0) {
        docSnap.docs.map((doc) => list.push(doc.data()));
        // sort
        list.sort(
          (a: any, b: any) => +new Date(b.time_stamp) - +new Date(a.time_stamp)
        );

        setLatest([...list]);
      } else {
        setError("Error getting recent login. Try again later");
      }
    } catch (err: any) {
      setError(true);
      setLoading(false);
      return err;
    }
    setLoading(false);
    console.log(latest);
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getLatestSignIn();
    }
    return () => {
      effectRan.current = true;
    };
  }, [latest]);

  loading && <LoadingScreen />;

  return (
    <>
      <div className=" bg-slate-100 px-5 pb-8 ">
        <h2 className="text-base md:text-xl mb-2 font-semibold sticky top-0 py-5 bg-slate-100 ">
          Recent Login
        </h2>
        <div className="max-w-5xl mx-auto relative max-h-[50vh] h-full overflow-scroll">
          {!error && (
            <table className="w-full pb-5  bg-slate-100 ">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Email
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100  h-full overflow-scroll">
                {latest &&
                  latest.map((user: any, index: number) => (
                    <TableRows
                      key={index}
                      email={user.email}
                      time={user.time_stamp}
                    />
                  ))}
              </tbody>
            </table>
          )}
          {error && (
            <Toast
              message="An error occurred. Try again later"
              close={() => setError(false)}
            />
          )}
        </div>
      </div>

      {/* </div> */}
    </>
  );
};
export default Table;
