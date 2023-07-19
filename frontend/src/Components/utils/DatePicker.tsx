/** @format */

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export const DateComponent = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div className="w-[38vh]  mx-14 my-2">
      <Datepicker
        primaryColor={"blue"}
        useRange={false}
        asSingle={true}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
};
