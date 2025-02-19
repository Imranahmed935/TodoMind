import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />, 
    },
    {
        path: '/home', 
        element: <App />,
    }
]);
