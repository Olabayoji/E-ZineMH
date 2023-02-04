import React from "react";

type Props = {
  email: string;
  time: string;
};

const TableRows = (props: Props) => {
  var isoDateTime = new Date(props.time);
  var localDateTime =
    isoDateTime.toLocaleDateString() + " " + isoDateTime.toLocaleTimeString();
  return (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {props.email}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {localDateTime}
      </td>
    </tr>
  );
};

export default TableRows;
