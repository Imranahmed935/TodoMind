import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Update from "../Components/Update";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />, 
    },
    {
        path: '/home', 
        element: <App />,
    },
    {
        path: '/update/:id', 
        element: <Update/>,
    }
]);
