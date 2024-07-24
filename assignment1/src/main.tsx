import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import OTPForm from "./pages/otp-form.tsx";
import CourseListPage from "./pages/course-list.tsx";
import BatchesPage from "./pages/batches.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/otp-form",
    element: <OTPForm />,
  },
  {
    path: "/course-list",
    element: <CourseListPage />,
  },
  {
    path: "/batches",
    element: <BatchesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <a href="https://chaicode.com/" className="fixed z-10 bottom-10 right-10">
      <img src="./logo.png" alt="" className="w-16 h-16 rounded" />
    </a>
  </React.StrictMode>
);
