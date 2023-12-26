import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <section className='box-landing'>
            <div className='landing'>
                <h2>Tundra comida vegana</h2>

                <div className='box-landing-link'>
                    <h3>Ya sos cliente</h3>
                    <Link className='linkNav' to={'/Iniciar-sesion'}>Incia sesión</Link>
                </div>
                
                <div className='box-landing-link'>
                    <h3>¿Todavía no te registraste?</h3>
                    <Link className='linkNav' to={'/Registrarse'}>Registrate</Link>
                </div>

            </div>
        </section>
    );
};

export default Landing;