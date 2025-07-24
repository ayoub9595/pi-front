import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Adjust path as needed
import Login from "./views/login/Login.jsx";
import Signup from "./views/signup/Signup.jsx";
import Layout from "./layout/Layout.jsx";
import AddEquipment from "./views/addEquipment/AddEquipment.jsx";
import EquipmentsList from "./views/equipmentList/EquipmentsList.jsx";
import EditEquipment from "./views/editEquipment/EditEquipment.jsx";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import PrivateRoute from "./routerUtils/PrivateRoutes.jsx";
import PublicRoute from "./routerUtils/PublicRoutes.jsx";
import AffectationList from "./views/affectationList/AffectationList.jsx";
import EditAffectation from "./views/editAffectation/EditAffectation.jsx";
import CreateAffectation from "./views/addAffectation/AddAffectation.jsx";
import {setNavigateFunction} from "./service/fetchClient.js";


const NavigationSetup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigateFunction(navigate);
    }, [navigate]);

    return null;
};

const AppRoutes = () => {
    return (
        <>
            <NavigationSetup />
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
                    <Route index element={<AddEquipment />} />
                    <Route path="equipements" element={<EquipmentsList />} />
                    <Route path="equipements/edit/:id" element={<EditEquipment />} />

                    <Route path="affectations" element={<AffectationList />} />
                    <Route path="affectations/edit/:id" element={<EditAffectation />} />
                    <Route path="affectations/create" element={<CreateAffectation />} />
                </Route>


                <Route
                    path="/home/dashboard"
                    element={
                        <PrivateRoute requiredRole="UTILISATEUR">
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;