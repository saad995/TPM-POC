import _ from "lodash";
import { resources_EN } from "../Resources/Resources_EN";
 export const QuantityValidator = (value: number) => {
    let validation = { message: "Quantity must be greater than zero", isValid: false };

    if (value > 0) {
        validation.message = "";
        validation.isValid = true;
    }

    return validation;
};
