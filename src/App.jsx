import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/General/Landing/Landing';
import NavBar from "./components/General/NavBar/NavBar";
import Footer from "./components/General/Footer/Footer";
import DetailContainerUser from './components/User/DetailContainerUser/DetailContainerUser';
import DetailContainerAdmin from './components/Admin/DetailContainerAdmin/DetailContainerAdmin';
import RegisterForm from './components/General/RegisterForm/RegisterForm';
import LoginForm from './components/General/LoginForm/LoginForm';
import ItemListContainer from './components/General/ItemListContainer/ItemListContainer';
import Profile from "./components/General/Profile/Profile";
import Cart from "./components/User/Cart/Cart";
import FavoriteListContainer from "./components/User/FavoriteListContainer/FavoriteListContainer";
import OrderListContainer from './components/General/OrderListContainer/OrderListContainer';
import FormUpdateUser from './components/General/FormUpdateUser/FormUpdateUser';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Registrarse" element={<RegisterForm />} />
                <Route path="/Iniciar-sesion" element={<LoginForm />} />
                <Route path="/Inicio" element={<ItemListContainer />} />
                <Route path="/Detalle/:id" element={<DetailContainerUser />} />
                <Route path="/Detalle-admin/:id" element={<DetailContainerAdmin />} />
                <Route path="/Mi-perfil" element={<Profile />} />
                <Route path="/Carrito" element={<Cart />} />
                <Route path="/Favoritos" element={<FavoriteListContainer />} />
                <Route path="/Ordenes" element={<OrderListContainer />} />
                <Route path="/Actualizar-usuario" element={<FormUpdateUser />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;