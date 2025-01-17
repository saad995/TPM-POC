import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18n from "Lib/Helpers/i18n";
import Message from "Elements/Basic/Message/Message";
import store from "Store";
import Toaster from "Elements/Basic/Toaster/Toaster";

//Remove consoles in production environment
// if (process.env.NODE_ENV === 'production') {
//         console.log = () => {}
//         console.error = () => {}
//         console.debug = () => {}
//     }
    
ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <Message />
                <Toaster />
                <App />
            </Provider>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
