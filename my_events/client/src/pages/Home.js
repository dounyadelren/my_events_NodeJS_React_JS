import React from "react";
import Nav from "../Components/Nav";
import Menu from '../Components/Menu'
import Body from "../Components/Body";

const Home = () => {
    return (
        <div>
            <Nav />
            <div className="flex md:flex-col">
                <div className="max-w-screen-sm border-solid border-1 bg-secondary">
                    <Menu />
                </div>
                <div className="w-full border-solid border-1 bg-success">
                    <Body />
                </div>
            </div>
            <p className="text-center text-success text-xs mt-4 mb-3">
                &copy;2022 Corentin, Dounya, All rights reserved.
            </p>
        </div>
    )
}

export default Home;