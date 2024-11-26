import React from "react";
import astro from "../assets/astronaut.png";
import "../styles/Error403.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Error403 = () => {
    return (
        <>
            <Navbar />
            <div className="error_403">
                <div className="err_main_cont">
                    <img src={astro} alt="" />
                    <div className="error_403_inner">
                        <h1>Error - 403</h1>
                        <h3>Access Denied</h3>
                        <p>You Do not have this permission.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Error403;