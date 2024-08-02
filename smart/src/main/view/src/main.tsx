import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Scrolltotop from "./Scrolltotop";
import App from "./pages/App";
import "./index.scss";

const queryClient = new QueryClient();

//Form
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Fragment>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <BrowserRouter>
                    <Scrolltotop />
                    <App />
                </BrowserRouter>
            </HelmetProvider>
        </QueryClientProvider>
    </Fragment>
);
