import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from '../pages/Home';
import InfoEvents from "../pages/InfoEvents";
import Profil from "../pages/Profil";
import InfoSorties from "../pages/infoSorties";
import ProfilMember from "../pages/ProfilMembers";

const Path = () => {

    const loggedIn = sessionStorage.getItem('userLoggedIn');

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/events/:id" element={<InfoEvents />} />
                <Route path="/details/:id" element={<InfoSorties />} />
                <Route path="/membre/:id" element={<ProfilMember />} />
                {
                    loggedIn ?
                        <>
                            <Route path="/profil" element={<Profil />} />
                        </>
                        :
                        <>
                            <Route path="/profil" element={<Home />} />
                        </>
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Path