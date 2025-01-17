import React, { useState, useEffect } from "react";
import _ from "lodash";
import withPermissionCheck from "../../Basic/BaseField/BaseField";
import {
  DropDownList
} from "@progress/kendo-react-dropdowns";

const CountryDropDown = (props: any) => {
  const [countries, setCountries] = useState([]);
  const { mode, permissions, defaultVal, value } = props;

  let disable = _.isEqual(permissions & 2, 2) ? false : true;

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => {
        const arr:any = [];
        {data.map((data:any) => {
          arr.push(data.name)
        })}
        setCountries(arr);
      });
  }, []);

  return (
    <div>
      {/* <select disabled={disable} defaultValue={defaultVal}>
        {countries.map((data:any) => {
          return <option selected={_.isEqual(data.name,defaultVal)}>{data.name}</option>
        })}
        </select> */}

      <DropDownList data={countries} defaultValue={defaultVal} />
    </div>
  );
};

export default withPermissionCheck(CountryDropDown);
