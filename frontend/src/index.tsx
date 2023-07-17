/** @format */
"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./App";
import "./globals.css";
import { LoginComponent } from "./Components/User/login";
import ChatUI from "./Components/chat/page";
import ExploreTab from "./Components/Explore/ExploreTab";

const router = createBrowserRouter([
  { path: "/", element: <LoginComponent /> },
  { path: "/home", element: <Home /> },
  { path: "/messages", element: <ChatUI /> },
  { path: "/explore", element: <ExploreTab /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
