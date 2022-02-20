import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { MultiSelect } from "react-multi-select-component";
import Nav from "../Components/Nav";
import Logo from "../assets/images/LOGO.png";
import '../assets/css/infoEvent.css'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: "30px",
        width: '70%',
        height: '70%',
        overlay: {
            background: "#FFFF00"
        },
    },
    overlay: {
        background: "rgba(0, 0, 0, 0.8)"
    }
};

const messStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: "30px",
        width: '50%',
        height: '9%',
        overlay: {
            background: "#FFFF00"
        },
    },
    overlay: {
        background: "rgba(0, 0, 0, 0.8)"
    }
};

Modal.setAppElement('#root');

const Event = () => {

    let { id } = useParams();
    let subId = id.replace("id=", "");

    const user = JSON.parse(sessionStorage.getItem("userLoggedIn"));

    const [event, setEvent] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [messOpen, setMessOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [users, setUsers] = useState([]);

    const options = users.map(response => ({
        "label": response.name,
        "value": response._id
    }))

    const getUsers = () => {

        const formInfo = {
            id: user._id
        }

        fetch(`http://localhost:8000/get_users`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(res => setUsers(res))
    }

    useEffect(() => {

        getUsers();

        fetch(`https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records/${subId}`)
            .then(res => res.json())
            .then(res => {
                const data = res.record.fields
                setEvent(data)
            })
    }, [])


    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    }


    function openMess() {
        setMessOpen(true);
        document.body.style.overflow = 'hidden';
    }

    function closeMess() {
        setTimeout(() => { setMessOpen(false) }, 5000)
        document.body.style.overflow = 'unset';
    }



    const onSubmit = async (e) => {
        e.preventDefault();
        const selectedUser = selected?.map(element => {
            return element.label
        });

        const formInfo = {
            guest: selected
        }

        for (let key in e.target.elements) {
            if (['INPUT', 'SELECT'].includes(e.target.elements[key].tagName) && e.target.elements[key].value !== '') {
                formInfo[(e.target.elements[key].name)] = (e.target.elements[key].value);
            }
        }

        fetch(`http://localhost:8000/add_event`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())

        closeModal()
        openMess()
    }

    return (
        <>
            <Modal
                isOpen={messOpen}
                style={messStyles}
                onAfterOpen={closeMess}
                contentLabel="Modal eventAddOk"
            >
                <div className="flex justify-center">
                    <h1 className="text-info text-lg">Votre evenement à bien été ajouter vous le retrouverez sur votre profil</h1>
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Modal eventAdd"
                overlayClassName="Modal"
            >
                <button className="hover:text-info" onClick={closeModal}>
                    <svg width="2rem" height="2rem" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-9.414l2.828-2.829l1.415 1.415L13.414 12l2.829 2.828l-1.415 1.415L12 13.414l-2.828 2.829l-1.415-1.415L10.586 12L7.757 9.172l1.415-1.415L12 10.586z"></path>
                    </svg>
                </button>
                <p className="text-center text-success text-md mt-1 mb-3 mt-4">Organiser votre sortie</p>
                <div className="flex justify-center bg-white p-5 sm:flex sm:flex-col">
                    <div className="mb-5 sm:mb-12 sm:flex sm:flex-col">
                        <div className="box-border h-32 w-82">
                            <h1 className="text-lg font-semibold">{event?.title}</h1>
                            <span>Du {event?.date_start?.substr(8, 2) + "/" + event?.date_start?.substr(5, 2) + "/" + event?.date_start?.substr(0, 4)} au {event?.date_end?.substr(8, 2) + "/" + event?.date_end?.substr(5, 2) + "/" + event?.date_end?.substr(0, 4)}</span>
                            <p>Lieu : {event?.address}</p>
                            <p>Département : {event?.department}</p>
                            <h2 className="text-md">Description de l'évenement : </h2>
                            <p>{event?.description}</p>
                        </div>
                    </div>
                </div>
                <div className="md:flex md:flex-co sm:py-5">
                    <form action="" onSubmit={onSubmit} className="flex justify-center mt-20">
                        <div className="flex">
                            <input type="hidden" name="id_user" value={user?._id} />
                            <input type="hidden" name="organisateur" value={user?.name} />
                            <input type="hidden" name="adress" value={event?.address} />
                            <input type="hidden" name="date" value={event?.date_start} />
                            <input type="hidden" name="title" value={event?.title} />
                            <input type="hidden" name="description" value={event?.description} />
                            <input type="hidden" name="picture" value={event?.image_thumb} />
                            <input type="hidden" name="lo" value={event?.latlon?.lon} />
                            <input type="hidden" name="la" value={event?.latlon?.lat} />
                            <select name="status" className="rounded h-10 w-20 bg-white md:mr-5 md:ml-5 md:w-max border mr-2">
                                <option value="">Statut</option>
                                <option value="public">Public</option>
                                <option value="privé">Privé</option>
                            </select>
                            <div className="max-w-full">
                                <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy={"Select"}
                                />
                            </div>
                        </div>
                        <div className="mt-1 ml-4">
                            <button className="hover:text-info" type="submit">
                                <svg width="2rem" height="2rem" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                                        <path strokeLinejoin="round" d="M8 12L11 15L16 10" class="il-md-length-15 il-md-duration-4 il-md-delay-5"></path>
                                        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" class="il-md-length-70 il-md-duration-4 il-md-delay-0"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Nav />
            <div className="bg-white p-5 sm:flex sm:flex-col">
                <h1 className="text-lg font-semibold">{event?.title}</h1>
                <div className="flex mb-5 sm:mb-12 sm:flex sm:flex-col">
                    {
                        event?.image ?
                            <img src={event?.image} className="box-border h-40 w-40 p-2 ml-1 mt-1 mr-1 mb-1 object-cover" alt="image evenement" />
                            :
                            <img className="box-border h-40 w-40 p-2 ml-1 mt-1 mr-1 mb-1 bg-info" src={Logo} alt="logo" />
                    }
                    <div className="box-border h-32 w-82 p-2">
                        <span>Du {event?.date_start?.substr(8, 2) + "/" + event?.date_start?.substr(5, 2) + "/" + event?.date_start?.substr(0, 4)} au {event?.date_end?.substr(8, 2) + "/" + event?.date_end?.substr(5, 2) + "/" + event?.date_end?.substr(0, 4)}</span>
                        <p>Lieu : {event?.address}</p>
                        <p>Département : {event?.department}</p>
                        <input type="button" onClick={openModal} className="bg-info border hover:border-transparent text-white hover:text-black font-semibold py-1 px-4 rounded mr-5 sm:hidden" value="Organiser une sortie" />
                        <button className=" md:hidden lg:hidden hover:text-info" onClick={openModal}>
                            <svg width="2rem" height="2rem" viewBox="0 0 256 256">
                                <path fill="currentColor" d="M216 48v40H40V48a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8Z" opacity=".2"></path>
                                <path fill="currentColor" d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32H48V48Zm136 160H48V96h160v112Zm-44-56a8 8 0 0 1-8 8h-20v20a8 8 0 0 1-16 0v-20h-20a8 8 0 0 1 0-16h20v-20a8 8 0 0 1 16 0v20h20a8 8 0 0 1 8 8Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-md">Description de l'évenement : </h2>
                    <p>{event?.description}</p>
                </div>
            </div>
        </>
    )
}

export default Event;