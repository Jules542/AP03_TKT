import React from "react";
import { useNavigate } from 'react-router-dom';


const Banner = () => {
    const navigate = useNavigate();

    const handleRedirection = () => {
        navigate('/login');
    }

    return (
        <div className="home-banner-container">
            <h1>PARC ASTÉRIX</h1>
            <button onClick={handleRedirection}>Se connecter</button>
        </div>
    )
}

export default Banner;