import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/LOGO.png"
import "../assets/css/burger.css"
import Burger from "../Components/Burger"
import Facebook from "./Facebook";


const Nav = () => {

    const user = sessionStorage.getItem('userLoggedIn');

    const [ showBurger, setShowBurger] = useState(false);

    const handleShowBurger = () => {
        setShowBurger(!showBurger)
    }

    return (
        <nav className="bg-primary w-full flex justify-between p-4">
            <Link to="/" className="flex">
                <img src={Logo} className="h-10 w-10" alt="logo" />
                <h2 className="text-white align-baseline p-2">My Events</h2>
            </Link>
            <div className="md:flex md:justify-end sm:flex sm:justify-end">
                <button className="h-8 w-8 lg:hidden navbar_burger z-10" onClick={handleShowBurger}>
                    <span className="burger-bar"></span>
                </button>
                {
                    showBurger ? <Burger /> : ""
                }
                {
                    user ?
                        <Link to="/profil" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>
                        :
                        <div className="text-white md:ml-2 sm:ml-1">
                            <Facebook />
                        </div>
                }
            </div>
        </nav>
    )
}

export default Nav;