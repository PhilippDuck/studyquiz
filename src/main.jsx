import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Create from "./pages/Create";
import Play from "./pages/Play.jsx";
import Root from "./Root.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript />
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Navigate to="/play" replace />} />
            <Route path="play" element={<Play />} />
            <Route path="create" element={<Create />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
