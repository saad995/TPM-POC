import React from "react";

import { DatePicker } from "@progress/kendo-react-dateinputs";
import { getPreviousMonthsDate } from "Modules/Common/Helpers/DateHelper";
import { useState } from "react";
import _ from "lodash";
import { validateDates } from "Modules/Common/Helpers/ReportHelpers";
import './FromAndToDatePicker.scss'


const FromAndToDatePicker = (props:any) => {
  const {fromDate, setFromDate, toDate, setToDate,isToDateValid, setIsToDateValid, isFromDateValid, setIsFromDateValid, today, minDate} = props;
  

    const [fromDateValidationMessage, setFromDateValidationMessage] = useState("");
    const [toDateValidationMessage, setToDateValidationMessage] = useState("");

    const datesValidator = (fromDateArg: Date, toDateArg: Date) => {
      setIsToDateValid(false);
      setIsFromDateValid(false);

      let messages = validateDates(fromDateArg, toDateArg, minDate, today);
      let fromValidationMessage = messages[0];
      let toValidationMessage = messages[1];

      if (_.isEmpty(fromValidationMessage)) {
          fromValidationMessage = "";
          setIsFromDateValid(true);
          setFromDateValidationMessage("");
      }
      if (_.isEmpty(toValidationMessage)) {
          toValidationMessage = "";
          setIsToDateValid(true);
      }

      setFromDateValidationMessage(fromValidationMessage);
      setToDateValidationMessage(toValidationMessage);
  };

    const   handleFromDate = (value: any) => {
      setFromDate(value.value);
      datesValidator(value.value, toDate);
  };
  const handleToDate = (value: any) => {
    setToDate(value.value);
    datesValidator(fromDate, value.value);
};

  

  return (
      <div className="main-container">
        <span className="mr-4 text-date">From</span>
        <DatePicker value={fromDate} min={minDate} max={today}  onChange={handleFromDate} validationMessage={fromDateValidationMessage}/>
        <span className="mr-4 text-date ml-3">To</span>
        <DatePicker value={toDate} min={minDate} max={today}  onChange={handleToDate} validationMessage={toDateValidationMessage}/>
      </div>
  );
};
export default FromAndToDatePicker;