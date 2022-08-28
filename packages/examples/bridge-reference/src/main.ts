import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./pages/App";

createRoot(document.getElementById("app")!).render(React.createElement(App));
