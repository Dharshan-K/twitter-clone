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
import { SignUpComponent } from "./Components/User/signUp";
import Hashtag from "./Components/hashtag/hashtag";
import Dropdown from "./Components/utils/Dropdown";
import { CommentComponent } from "./Components/Comments/CommentComponent";
import { CommentPage } from "./Components/Comments/page";

const router = createBrowserRouter([
  { path: "/", element: <LoginComponent /> },
  { path: "/home", element: <Home props={{ page: "Home" }} /> },
  { path: "/messages", element: <ChatUI /> },
  { path: "/explore", element: <ExploreTab /> },
  { path: "/signUp", element: <SignUpComponent /> },
  { path: "/tweet/:hashtag", element: <Home props={{ page: "Explore" }} /> },
  { path: "/dropdown", element: <Dropdown /> },
  { path: "/comments/:id", element: <CommentPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
