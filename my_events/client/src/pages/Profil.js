import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../Components/Nav";
import Image from '../assets/images/profilePic.jpeg';
import "../assets/css/body.css";

const Profil = () => {

    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('userLoggedIn'));
    const [event, setEvent] = useState();

    useEffect(() => {
        const formInfo = {
            id_user: user._id
        }

        fetch('http://localhost:8000/get_event', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(data => setEvent(data))
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const formInfo = {}

        for (let key in e.target.elements) {
            if (['TEXTAREA', 'INPUT'].includes(e.target.elements[key].tagName) && e.target.elements[key].value !== '') {
                formInfo[(e.target.elements[key].name)] = (e.target.elements[key].value);
            }
        }

        fetch(`http://localhost:8000/update`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
    }

    const Logout = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8000/logout`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => res.json())
        sessionStorage.clear()
        navigate('/')
        window.location.reload(true);
    }

    return (
        <>
            <Nav />
            <div className="grid grid-cols-3 gap-4 mt-3 md:flex md:flex-col md:mx-auto sm:flex sm:flex-col">
                <div className="ml-4 flex flex-col text-white col sm:mx-auto">
                    <div className="flex mt-5 mb-5 text-white md:mx-auto sm:mx-auto">
                        {
                            user.mail !== undefined ?
                                <img className="w-14 rounded-full" src={Image} alt="chargement"></img>
                                :
                                <img className="w-14 rounded-full" src={user.picture.data.url} alt="chargement"></img>
                        }
                        <div className="mt-1 ml-3">
                            <h1 className="text-lg">{user.name}</h1>
                            <p className="text-xs text-success">Connecté avec facebook</p>
                        </div>
                        <button className='mr-2 mb-2 mt-5 ml-4' onClick={Logout}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                    <h1 className="md:hidden sm:hidden">Bio :</h1>
                    <div className="mt-2 md:mx-auto">
                        <form action="" onSubmit={onSubmit}>
                            <input type="hidden" name="id" value={user._id} />
                            <textarea className="resize-none appearance-none bg-white text-black border border-primary rounded lg:py-3 lg:px-4 md:py-3 md:px-4 mb-3 focus:outline-none focus:bg-secondary focus:border-primary" cols="40" rows="8" name="description" placeholder={user.description}></textarea>
                            <div id="moreInformationBtn" className="grid mr-4 justify-items-end md:justify-items-center md:mx-auto sm:justify-items-center sm:mx-auto">
                                <button type="submit" className="bg-info border hover:border-transparent text-white hover:text-black font-semibold py-1 px-3 rounded mr-3">Modifier ma bio</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-span-3 ml-4 text-white md:flex md:flex-col md:ml-4 sm:ml-4 sm:flex sm:flex-col">
                    <h1 className="md:hidden sm:hidden">Vos sorties : </h1>
                    {
                        event?.map((element, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex items-center max-w rounded overflow-hidden shadow-lg bg-primary mt-2 mr-4 mb-3 sm:flex-col">
                                    <img src={element.picture} alt={element.picture} className="object-cover w-100 h-100 ml-4 mt-3 mb-3 sm:hidden" />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{element.title}</div>
                                        <p className="text-white text-base">
                                            {element.adress}
                                        </p>
                                        <p className="text-white text-base">
                                            le {element.date.substr(8, 2) + "/" + element.date.substr(5, 2) + "/" + element.date.substr(0, 4)}
                                        </p>
                                        <p className="text-white text-base">
                                            Participants : {element.guest.length}
                                        </p>
                                        <p className="text-white text-base">
                                            {element.status}
                                        </p>
                                    </div>
                                </div>
                                <div id="more" className="flex justify-end mr-5">
                                    <Link to={{ pathname: `/details/id=${element._id}` }} state={{ title: element.title }}>
                                        <input type="button" className="bg-info border hover:border-transparent text-white hover:text-black font-semibold py-1 px-4 rounded mr-5 sm:mb-2 cursor-pointer" value="En savoir +" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Profil