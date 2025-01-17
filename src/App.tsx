import LoaderComponent from "Elements/Basic/Loader/Loader";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import config from "Config";
const baseURL = config.baseURL;

function App() {
console.log("TPM App===", baseURL);

// useEffect(() => {
//     if(window.location.pathname.includes('tpm')){
//         return window.location.reload();
//     }
//    },[]);

    return (
        <Router basename="/app">
            <Suspense fallback={<LoaderComponent />}>
                <Routes path={"/"} />
            </Suspense>
        </Router>
    );
}

export default App;
