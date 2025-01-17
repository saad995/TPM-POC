import React, { useState, useEffect } from "react";
import _ from "lodash";

const BoxMenu = (props: any) => {

  const Menu = {
    modules: [{
      moduleName:"PSW",
      modules:[{
        moduleName:"Home",
        label:"Home",
        link:"/"
      },{
        moduleName:"Dashboard",
        label:"Dashboard",
        link:"/Dashboard"
      }]
    },{
      moduleName:"OGA",
      modules:[{
        moduleName:"ImportPermit",
        label:"Import Permit",
        link:"/OGA/ImportPermit"
      },{
        moduleName:"ReleaseOrder",
        label:"Release Order",
        link:"/Dashboard"
      }]
    }]
  }
  
  return (
    <div>
    
    </div>
  );
};

export default BoxMenu;
