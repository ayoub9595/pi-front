import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/Login.jsx";
import Signup from "./views/signup/Signup.jsx";
import Layout from "./layout/Layout.jsx";
import AddEquipment from "./views/addEquipment/AddEquipment.jsx";
import EquipmentsList from "./views/equipmentList/EquipmentsList.jsx";
import EditEquipment from "./views/editEquipment/EditEquipment.jsx";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import PrivateRoute from "./routerUtils/PrivateRoutes.jsx";
import PublicRoute from "./routerUtils/PublicRoutes.jsx";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute requiredRole="ADMIN">
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route path="equipements" element={<EquipmentsList />} />
                    <Route path="equipements/edit/:id" element={<EditEquipment />} />
                    <Route index element={<AddEquipment />} />
                </Route>

                <Route
                    path="/home/dashboard"
                    element={
                        <PrivateRoute requiredRole="UTILISATEUR">
                            <Layout />
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;