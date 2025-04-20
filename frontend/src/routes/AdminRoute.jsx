import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const AdminRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    return user?.role === "admin" ? children : <Navigate to='/login'/>;
};

export default AdminRoute;
