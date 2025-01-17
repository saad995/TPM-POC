import { GridCellProps } from "@progress/kendo-react-grid";
import { getTimeAgoMessage } from "Modules/Common/CommonUtility";

export const AgeCustomCell = (props: GridCellProps) => {
    const field = props.field || "";
    const value = props.dataItem[field];
    if (value) {
        //   console.log("inside ", props.dataItem);
        const hours = Number(value);
        let status: string = getTimeAgoMessage(hours);
        const days = Math.floor(hours / 24);

        const icon: any =
            days > 7 ? (
                <span className="k-icon k-i-circle red-dot " />
            ) : days > 3 && days < 8 ? (
                <span className="k-icon k-i-circle yellow-dot " />
            ) : (
                <span className="k-icon k-i-circle green-dot " />
            );

        return (
            <td colSpan={1} role="gridcell">
                {icon} {status}
            </td>
        );
    }

    return <td colSpan={1} role="gridcell"></td>;
};
