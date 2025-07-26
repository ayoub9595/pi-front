import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./views/authentication/login/Login.jsx";
import Signup from "./views/authentication/signup/Signup.jsx";
import Layout from "./layout/Layout.jsx";
import AddEquipment from "./views/equipment/addEquipment/AddEquipment.jsx";
import EquipmentsList from "./views/equipment/equipmentList/EquipmentsList.jsx";
import EditEquipment from "./views/equipment/editEquipment/EditEquipment.jsx";
import PrivateRoute from "./routerUtils/PrivateRoutes.jsx";
import PublicRoute from "./routerUtils/PublicRoutes.jsx";
import AffectationList from "./views/affectation/affectationList/AffectationList.jsx";
import EditAffectation from "./views/affectation/editAffectation/EditAffectation.jsx";
import CreateAffectation from "./views/affectation/addAffectation/AddAffectation.jsx";
import { setNavigateFunction } from "./service/fetchClient.js";
import AccessDenied from "./views/accessDenied/AccessDenied.jsx";
import NotFound from "./views/notFound/NotFound.jsx";

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
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <PrivateRoute requiredRole="ADMIN" useAccessDenied={true}>
                                <AddEquipment />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="equipements"
                        element={
                            <PrivateRoute requiredRole="ADMIN" useAccessDenied={true}>
                                <EquipmentsList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="equipements/edit/:id"
                        element={
                            <PrivateRoute requiredRole="ADMIN" useAccessDenied={true}>
                                <EditEquipment />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="affectations"
                        element={
                            <PrivateRoute>
                                <AffectationList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="affectations/edit/:id"
                        element={
                            <PrivateRoute requiredRole="ADMIN" useAccessDenied={true}>
                                <EditAffectation />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="affectations/create"
                        element={
                            <PrivateRoute requiredRole="ADMIN" useAccessDenied={true}>
                                <CreateAffectation />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
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
