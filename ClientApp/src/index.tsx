import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { App } from "./App";
import "./custom.css";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") ?? "";
const rootElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>,
    rootElement);
