import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../assets/css/body.css'
import Logo from "../assets/images/LOGO.png"

const Body = () => {

    const location = useLocation();

    const [events, setEvents] = useState([])
    const [offset, setOffset] = useState(0)
    const [pages, setPages] = useState(1)
    const [pageNext, setPageNext] = useState(true)
    const [pagePreviews, setPagePreviews] = useState(true)

    useEffect(() => {

        if (location?.state?.place && location?.state?.query) {
            fetch(`https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records?limit=5&offset=${offset}&facets?&refine=city:${location?.state?.place}&refine=tags:${location?.state?.query}`)
                .then(res => res.json())
                .then(res => {
                    const data = res.records
                    setEvents(data)
                    console.log(events)
                    res.links.map(element => {
                        if (element.next === null) {
                            setPageNext(false)
                        } else {
                            setPageNext(true)
                        }
                        if (element.previous !== null) {
                            setPagePreviews(false)
                        } else {
                            setPagePreviews(true)
                        }
                    })
                })
        } else if (location?.state?.place) {
            fetch(`https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records?limit=5&offset=${offset}&facets?&refine=city:${location?.state?.place}`)
                .then(res => res.json())
                .then(res => {
                    const data = res.records
                    setEvents(data)
                    res.links.map(element => {
                        if (element.next === null) {
                            setPageNext(false)
                        } else {
                            setPageNext(true)
                        }
                        if (element.previous !== null) {
                            setPagePreviews(false)
                        } else {
                            setPagePreviews(true)
                        }
                    })
                })
        } else if (location?.state?.query) {
            fetch(`https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records?limit=5&offset=${offset}&facets?&refine=tags:${location?.state?.query}`)
                .then(res => res.json())
                .then(res => {
                    const data = res.records
                    setEvents(data)
                    res.links.map(element => {
                        if (element.next === null) {
                            setPageNext(false)
                        } else {
                            setPageNext(true)
                        }
                        if (element.previous !== null) {
                            setPagePreviews(false)
                        } else {
                            setPagePreviews(true)
                        }
                    })
                })
        } else {
            fetch(`https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records?limit=5&offset=${offset}&facets?&refine=city:Paris`)
                .then(res => res.json())
                .then(res => {
                    const data = res.records
                    setEvents(data)
                    res.links.map(element => {
                        if (element.next === null) {
                            setPageNext(false)
                        } else {
                            setPageNext(true)
                        }
                        if (element.previous !== null) {
                            setPagePreviews(false)
                        } else {
                            setPagePreviews(true)
                        }
                    })
                })
        }

    }, [offset, location?.state?.query, location?.state?.place])

    const next = () => {
        setOffset(offset + 5);
        setPages(pages + 1)
    }

    const previews = () => {
        setOffset(offset - 5);
        setPages(pages - 1)
    }

    return (
        <div className="">
            <h1 className="text-left ml-2 text-xl md:text-center sm:text-center">Events à venir</h1>
            {
                events.map((element, i) => (
                    <div key={i}>
                        <div className="flex ml-3 mr-3">
                            <div className="flex grow mx-auto mt-2 mr-2 mb-2 w-5/6 bg-white p-2">
                                {
                                    element.record.fields.image_thumb ? 
                                    <img src={element.record.fields.image_thumb} className="box-border h-32 w-32 p-2 ml-1 mt-1 mr-1 mb-1 sm:hidden" alt="Chargement..." /> 
                                    : 
                                    <img className="box-border h-32 w-32 p-2 ml-1 mt-1 mr-1 mb-1 bg-info sm:hidden" src={Logo} alt="logo" />
                                }
                                <div className="ml-4 mt-2 mb-2">
                                    <h1 className="text-lg font-semibold">{element.record.fields.title}</h1>
                                    <p className="text-md">du {element.record.fields.date_start.substr(8, 2) + "/" + element.record.fields.date_start.substr(5, 2) + "/" + element.record.fields.date_start.substr(0, 4)} au {element.record.fields.date_end.substr(8, 2) + "/" + element.record.fields.date_end.substr(5, 2) + "/" + element.record.fields.date_end.substr(0, 4)}</p>
                                    <p className="text-md">À {element.record.fields.city}</p>
                                    <p className="text-md">{element.record.fields.department}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid justify-items-end mr-4" id="moreInformationBtn">
                            <Link to={{ pathname: `/events/id=${element.record.id}` }}><button className="bg-info border hover:border-transparent text-white hover:text-black font-bold py-1 px-3 rounded mr-3">En savoir +</button></Link>
                        </div>
                    </div>
                ))
            }
            <div className="flex justify-between mt-3">
                {
                    pagePreviews ?
                        <button onClick={previews} type="submit" className="bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ml-2 mb-2 sm:hidden" disabled>Précédent</button>
                        :
                        <button onClick={previews} type="submit" className="bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ml-2 mb-2 sm:hidden">Précédent</button>
                }
                {
                    pagePreviews ?
                        <button onClick={previews} type="submit" className="bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded ml-2 mb-2 lg:hidden md:hidden" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                        :
                        <button onClick={previews} type="submit" className="bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded ml-2 mb-2 lg:hidden md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                }
                <div className="mt-3 text-black">
                    {pages}
                </div>
                {
                    pageNext ?
                        <button onClick={next} type="submit" className="bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded mr-2 mb-2 sm:hidden" value="Suivant">Suivant</button>
                        :
                        <button onClick={next} type="submit" className="bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded mr-2 mb-2 sm:hidden" value="Suivant" disabled>Suivant</button>
                }
                {
                    pageNext ?
                        <button onClick={next} type="submit" className="bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded mr-2 mb-2 lg:hidden md:hidden" value="Suivant">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                        :
                        <button onClick={next} type="submit" className="bg-transparent hover:bg-secondary font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded mr-2 mb-2 lg:hidden md:hidden" value="Suivant" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                }
            </div>
        </div >
    )
}

export default Body;