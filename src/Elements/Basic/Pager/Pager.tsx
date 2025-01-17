import * as React from "react";
import { Pager, PageChangeEvent } from "@progress/kendo-react-data-tools";

interface IPage {
    skip: number;
    take: number;
}

interface IProps {
    length?: number;
    onPageChange: any;
    page: IPage;
    buttonCount?: number;
    info?: boolean;
    previousNext?: boolean;
    type?: "input" | "numeric";
    pageSizes? : number[];
}

const PagerComponent = (props: IProps) => {
    const {
        length = 0,
        onPageChange,
        page,
        buttonCount = 5,
        info = true,
        previousNext = true,
        type = "numeric",
        pageSizes = [10, 15, 20],
        ...others
    } = props;

    const handlePageChange = (event: PageChangeEvent) => {
        onPageChange({ skip: event.skip, take: event.take });
    };

    return (
        <Pager
            {...page}
            total={length}
            onPageChange={handlePageChange}
            buttonCount={buttonCount}
            info={info}
            previousNext={previousNext}
            type={type}
            pageSizes={pageSizes}
            {...others}
        />
    );
};

export default PagerComponent;
