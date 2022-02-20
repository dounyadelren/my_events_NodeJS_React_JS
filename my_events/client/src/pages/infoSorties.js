import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Map } from '@esri/react-arcgis';
import Nav from "../Components/Nav";
import Chat from "../Components/Chat";
import '../assets/css/infoSorties.css';
import Weather from '../assets/images/nuage.png'


const InfoSorties = (props) => {

    const location = useLocation()

    let { id } = useParams();
    let subId = id.replace("id=", "");

    const user = JSON.parse(sessionStorage.getItem('userLoggedIn'));
    const [event, setEvent] = useState();
    const [weather, setWeather] = useState();
    const [weatherName, setWeatherName] = useState();
    const [weatherTemp, setWeatherTemp] = useState();
    const [weatherWind, setWeatherWind] = useState();
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();

    useEffect(() => {
        const formInfo = {
            _id: subId
        }

        fetch(`http://localhost:8000/get_event/${subId}`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(data => {
                setEvent(data);
                const latSet = data.map(element => {
                    setLat(element.la.toString())
                })
                const lonSet = data.map(element => {
                    setLon(element.lo.toString())
                })
            })
    }, [])
    
    useEffect(async () => {
        if (lat !== undefined && lon !== undefined) {
            let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${process.env.REACT_APP_API_WEATHER}`
            let response = await fetch(url);
            let resJson = await response.json();
            setWeather(resJson.weather)
            setWeatherName(resJson.name)
            setWeatherTemp(resJson.main)
            setWeatherWind(resJson.wind)
        }
    }, [lat, lon])

    let temp = Math.round(weatherTemp?.temp);
    let temp_max = Math.round(weatherTemp?.temp_max);
    let temp_min = Math.round(weatherTemp?.temp_min);
    let humidity = Math.round(weatherTemp?.humidity);
    let wind = Math.round(weatherWind?.speed);

    return (
        <>
            <Nav />
            <div className="bg-white pb-4">
                <div className="p-5 mx-auto">
                    <h1 className="text-lg py-1 sm:text-center">Sortie : {location?.state?.title}</h1>
                    <div style={{ width: '100%', height: '200px', zIndex: '0' }}>
                        <div id="cercle"></div>
                        {
                            lon ?
                                <Map
                                    viewProperties={{
                                        center: [lon, lat],
                                        zoom: 15,
                                    }}
                                />
                                :
                                <p>Chargement</p>
                        }
                    </div>
                    <div className="flex mt-4 mb-3 sm:flex-col sm:w-full">
                        <div id="divGuest" className="flex border rounded border-secondary flex-col px-4 py-3 mr-5 md:border-none sm:border-none">
                            <h2 className="py-1">Participants</h2>
                            {
                                event?.map((element, i) => (
                                    <div key={i} className="grid grid-rows-2 grid-flow-col lg:gap-4 md:gap-2 sm:flex sm:flex-row sm:gap-O">
                                        <div>
                                            <div className="box-border h-20 w-20 p-2 ml-1 mt-1 mr-1 mb-1 bg-primary rounded"></div>
                                            <div className="w-10 ml-1">
                                                <span>{element.organisateur}</span>
                                            </div>
                                        </div>
                                        {
                                            element?.guest.map((res, i) => (
                                                <div key={i}>
                                                    <div>
                                                        <Link to={{ pathname: `/membre/id=${res.value}` }}>
                                                            <div className="box-border h-20 w-20 p-2 ml-1 mt-1 mr-1 mb-1 bg-info rounded"></div>
                                                            <div className="w-10 ml-1">
                                                                <span>{res.label}</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div id="divChat" className="flex border rounded border-secondary flex-col px-4 py-3">
                            <Chat state={{ name: user.name, event: event }} />
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col bg-secondary border rounded text-white border-secondary px-4 py-3">
                        <div className="flex justify-center">
                            <img src={Weather} alt="Chargement" className="w-20 h-20" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                            <p>Ville : {weatherName}</p>
                            {
                                weather?.map((res, i) => (
                                    <p>Prévision : {res.description}</p>
                                ))
                            }
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                            <p>Température : {temp}°C</p>
                            <p>Humidité : {humidity}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                            <p>Min : {temp_min}°C</p>
                            <p>Max : {temp_max}°C</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 mb-4 text-center">
                            <p>Force du vent : {wind} km/h</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default InfoSorties;