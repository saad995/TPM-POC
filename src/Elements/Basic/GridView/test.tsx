import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Grid,
  GridColumn as Column,
  GridPageChangeEvent,
  GridPagerSettings,
} from "@progress/kendo-react-grid";

import GridData from "Modules/Common/Test/GridData";

interface AppState {
  items: any;
  total: number;
  skip: number;
  pageSize: number;
  pageable: GridPagerSettings;
}

const App = () => {
  const createState = (skip: number, take: number) => {
    let pagerSettings: GridPagerSettings = {
      buttonCount: 5,
      info: true,
      type: "numeric",
      pageSizes: [2,3,4],
      previousNext: true,
    };
    return {
      items: GridData.slice(skip, skip + take),
      total: GridData.length,
      skip: skip,
      pageSize: take,
      pageable: pagerSettings,
    };
  };

  const [state, setState] = React.useState<AppState>(createState(0, 2));

  const pageChange = (event: GridPageChangeEvent) => {
    setState(createState(event.page.skip, event.page.take));
  };

  return (
    
      <Grid
        style={{ height: "280px" }}
        data={state.items}
        onPageChange={pageChange}
        total={state.total}
        skip={state.skip}
        pageable={state.pageable}
        pageSize={state.pageSize}
      >
        <Column field="id" />
        <Column field="AgencySiteName" title="Product Name" />
        <Column field="RoleName" title="Unit Price" />
      </Grid>
  );
};

export default App;