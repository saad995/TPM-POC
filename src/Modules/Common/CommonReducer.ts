import SharedReducers from "Modules/Common/Shared/SharedReducer";
import SubscriptionReducers from "Modules/Common/Subscription/SubscriptionReducer";
import DataMaskingReducer from "Modules/Common/DataMasking/DataMaskingReducer";

const CommonReducer = {
    ...SharedReducers,
    ...SubscriptionReducers,
    ...DataMaskingReducer
};

export default CommonReducer;
