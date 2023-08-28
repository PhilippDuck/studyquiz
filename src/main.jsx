import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Create from "./pages/Create";
import Play from "./pages/Play.jsx";
import Root from "./Root.jsx";
import Quizzes from "./pages/Quizzes";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { RealmProvider } from "./provider/RealmProvider";
import theme from "./Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RealmProvider>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Navigate to="/games" replace />} />
            <Route path="games" element={<Home />} />
            <Route path="play" element={<Play />} />
            <Route path="create" element={<Create />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
    </RealmProvider>
  </React.StrictMode>
);
