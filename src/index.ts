// Import React and ReactDOM
import React from "react";
import { createRoot } from "react-dom/client";

// Import Framework7
//@ts-ignore
import Framework7 from "framework7/lite-bundle";

import '../node_modules/framework7/framework7-bundle.min.css';

// Import Framework7-React Plugin
import Framework7React from "framework7-react";

// Import Framework7 Styles
import "framework7/css/bundle";

// Import Icons and App Custom Styles

import "./app/styles/index.scss";

// Import App Component
import App from "./app/App";

// Init F7 React Plugin
Framework7.use(Framework7React);

// Mount React App
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(React.createElement(App));
