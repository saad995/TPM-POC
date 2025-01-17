import { CSVLink } from "react-csv";

import Styles from "./ExportCSV.module.scss";

const ExportCSV = (props: any) => {
    const { data, headers, fileName, label, ...others } = props;
    const csvReport: any = {
        filename: fileName,
        headers: headers,
        data: data
    };

    const GetLabel = () => {
        return (label != undefined ? label : "Export to CSV");
    }

    return <CSVLink style={{ borderRadius: "0.7rem", fontSize: "1rem !important" }} className={"btn btn-dark btn-lg"} {...csvReport} {...others}>{GetLabel()}</CSVLink>;
};

export default ExportCSV;
