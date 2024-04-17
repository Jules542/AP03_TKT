import React, { useContext, useEffect, useState } from "react";
import Banner from "../components/home_page/Banner";
import Presentation from "../components/home_page/Presentation";



const HomePage = () => {
    return (
        <div className="home-page">
            <Banner />
            <Presentation />
        </div>
    )
}

export default HomePage;