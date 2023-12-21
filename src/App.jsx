import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/General/Landing/Landing';
import Home from './components/General/Home/Home';
import NavBar from "./components/General/NavBar/NavBar";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;