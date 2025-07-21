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
import AffectationList from "./views/affectationList/ListAffectation.jsx";
import EditAffectation from "./views/editAffectation/EditAffectation.jsx";
import CreateAffectation from "./views/addAffectation/AddAffectation.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Routes publiques */}
                <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

                {/* Routes pour ADMIN */}
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

                {/* Route UTILISATEUR */}
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
        </BrowserRouter>
    );
};

export default App;
