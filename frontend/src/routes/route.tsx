import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import DashBoard from "../pages/dashboard";
import Tasks from "../pages/tasks";
import PrivateRoute from "./privateRoute";

const RouterApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<PrivateRoute><Register /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
            <Route path="/tarefas" element={<PrivateRoute><Tasks /></PrivateRoute>} />
        </Routes>
    );
};

export default RouterApp;