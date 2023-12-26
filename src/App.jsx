import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/General/Landing/Landing';
import NavBar from "./components/General/NavBar/NavBar";
import Footer from "./components/General/Footer/Footer";
import DetailContainer from './components/General/DetailContainer/DetailContainer';
import RegisterForm from './components/General/RegisterForm/RegisterForm';
import LoginForm from './components/General/LoginForm/LoginForm';
import ItemListContainer from './components/General/ItemListContainer/ItemListContainer';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Registrarse" element={<RegisterForm />} />
                <Route path="/Iniciar-sesion" element={<LoginForm />} />
                <Route path="/Inicio" element={<ItemListContainer />} />
                <Route path="/Detalle/:id" element={<DetailContainer />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;