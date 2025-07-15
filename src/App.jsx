import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/Login.jsx";
import Signup from "./views/signup/Signup.jsx";
import Layout from "./layout/Layout.jsx";
import AddEquipment from "./views/addEquipment/AddEquipment.jsx";
import EquipmentsList from "./views/equipmentList/EquipmentsList.jsx";
import EditEquipment from "./views/editEquipment/EditEquipment.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/home" element={<Layout />}>
                    <Route index element={<AddEquipment />} />
                    <Route path="equipements" element={<EquipmentsList />} />
                    <Route path="/home/equipements/edit/:id" element={<EditEquipment />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
