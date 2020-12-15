import React, { useState } from "react";
import "./Results.css";
import Snackbar from "./Snackbar";

const Results = ({ currencyToConvert, data, value }) => {
  const result = (value * data.rates[currencyToConvert]).toFixed(2);

  const [open, setOpen] = useState(false);



  if (result === "NaN" && open === false) {
    setOpen(true);
  } else if (result !== "NaN" && open !== false) {
    setOpen(false);
  }
  return (
    <>
      {result !== "NaN" && value && (
        <div className="result" title={data.date}>
          <p>{result}{currencyToConvert}</p>
        </div>
      )}
      <Snackbar open={open} setOpen={setOpen} />
    </>
  );
};

export default Results;
// value.indexOf('€')>0