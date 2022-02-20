import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../Components/Nav";
import Image from "../assets/images/profilePic.jpeg";

const ProfilMember = () => {

    let { id } = useParams();
    let subId = id.replace("id=", "");
    const [user, setUser] = useState()
    const [event, setEvent] = useState()

    useEffect(() => {
        const formInfo = {
            id: subId
        }

        fetch(`http://localhost:8000/get_users/${subId}`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(res => setUser(res))

        getEvent();

    }, [])

    const getEvent = () => {
        const formInfo = {
            id_user: subId
        }

        fetch(`http://localhost:8000/get_event/user/${subId}`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(res => setEvent(res))
    }

    console.log(event);

    return (
        <>
            <Nav />
            <div className="grid grid-cols-3 gap-4 mt-3 md:flex md:flex-col md:mx-auto sm:flex sm:flex-col">
                <div className="ml-4 flex flex-col text-white col sm:mx-auto">
                    {
                        user?.map((res, i) => (
                            <>
                                <div className="flex mt-5 mb-5 text-white md:mx-auto sm:mx-auto" key={i}>
                                    {
                                        res?.picture?.data?.url == "" ?
                                            <img className="w-14 rounded-full" src={Image} alt="chargement"></img>
                                            :
                                            <img className="w-14 rounded-full" src={res?.picture?.data?.url} alt="chargement"></img>
                                    }
                                    <div className="mt-1 ml-3">
                                        <h1 className="text-lg">{res?.name}</h1>
                                        <p className="text-xs text-success">Connecté avec facebook</p>
                                    </div>
                                </div>
                                <h1 className="md:hidden sm:hidden">Bio :</h1>
                                <div className="mt-2 md:mx-auto">
                                    <textarea className="resize-none appearance-none bg-white text-black border border-primary rounded lg:py-3 lg:px-4 md:py-3 md:px-4 mb-3 focus:outline-none focus:bg-secondary focus:border-primary" cols="40" rows="8" name="description" placeholder={res?.description}></textarea>
                                </div>
                            </>
                        ))
                    }
                </div>
                <div className="col-span-3 ml-4 text-white md:flex md:flex-col md:ml-4 sm:ml-4 sm:flex sm:flex-col">
                    {
                        event?.map((element, i) => (
                            element.status === 'public' ?
                                <div key={i} className="mt-4">
                                    <div className="flex items-center max-w rounded overflow-hidden shadow-lg bg-primary mt-2 mr-4 mb-3 sm:flex-col">
                                        <img src={element.picture} alt={element.picture} className="object-cover w-40 h-40 ml-4 mt-1 mb-1 " />
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">{element.title}</div>
                                            <p className="text-white text-base">
                                                {element.adress}
                                            </p>
                                            <p className="text-white text-base">
                                                le {element.date.substr(8, 2) + "/" + element.date.substr(5, 2) + "/" + element.date.substr(0, 4)}
                                            </p>
                                            <p className="text-white text-base">
                                                {element.description}
                                            </p>
                                            <p className="text-white text-base">
                                                {element.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div id="more" className="flex justify-end mr-4">
                                        <Link to={{ pathname: `/details/id=${element._id}` }}>
                                            <input type="button" className="bg-info border hover:border-transparent text-white hover:text-black font-semibold py-1 px-4 rounded mr-5 sm:mb-2 cursor-pointer" value="En savoir +" />
                                        </Link>
                                    </div>
                                </div>
                                :
                                <>
                                    <p className="text-center text-success text-xs mt-4 mb-3">Vous ne pouvez pas voir les évenements privés</p>
                                </>
                        ))
                    }
                </div>
            </div>
        </>
    )

}

export default ProfilMember