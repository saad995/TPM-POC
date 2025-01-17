import _ from "lodash";

const AmountFormatter = (obj: any, colToFormat = [""], currencyCode = "",decimalPoints = 0) => {
    try{
        if(!isNaN(obj))
        {   
            if(_.isNil(currencyCode) || currencyCode === "")
            {
                return Number(obj).toLocaleString(undefined, {maximumFractionDigits: decimalPoints});
            } 
            return Number(obj).toLocaleString("en-US", {style:"currency", currency:currencyCode, maximumFractionDigits: decimalPoints});
        }
        else if(typeof obj == "object")
        {
            const cloneObject=  JSON.parse(JSON.stringify(obj));    
            cloneObject.map((item: any) =>  
            {
                if(colToFormat)
                {
                    for (let index = 0; index < colToFormat.length; index++) {
                        const colName = colToFormat[index];
                        let value = item[colName];

                        if(!isNaN(value))
                        {
                            if(_.isNil(currencyCode) || currencyCode === "")
                            {
                                item[colName] = Number(value).toLocaleString(undefined, {maximumFractionDigits: decimalPoints});
                            }
                            else
                            {
                                item[colName] = Number(value).toLocaleString("en-US", {style:"currency", currency:currencyCode, maximumFractionDigits: decimalPoints});
                            }                           
                        }
                    }            
                }
            });
            return cloneObject;
        }
        return obj;
    }
    catch
    {
        return obj;
    }
}

export default AmountFormatter;