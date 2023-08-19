import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Create from "./pages/Create";
import Play from "./pages/Play.jsx";
import Root from "./Root.jsx";
import Quizzes from "./pages/Quizzes";
import { RealmProvider } from "./provider/RealmProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RealmProvider>
    <ChakraProvider>
      <ColorModeScript />
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Navigate to="/play" replace />} />
            <Route path="play" element={<Play />} />
            <Route path="create" element={<Create />} />
            <Route path="quizList" element={<Quizzes />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
    </RealmProvider>
  </React.StrictMode>
);
