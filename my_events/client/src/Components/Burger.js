import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../assets/css/burger.css";

const Burger = () => {

    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [valuePlace, setValuePlace] = useState('');

    const handleDropdownChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setValuePlace(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formulaire = document.getElementById('formulaire')
        formulaire.classList.add('hidden')
    }

    return (
        <div id="formulaire" className="flex flex-col">
            <form className="bg-grey flex flex-col justify-center items-center left-0 right-0 bottom-0 h-full position-fixed filters sm:bg-primary" onSubmit={onSubmit}>
                <select name="category" className="rounded h-10 bg-primary text-white mx-auto border mb-5" onChange={handleDropdownChange}>
                    <option value="">Tout</option>
                    <option value="concert">Concerts</option>
                    <option value="Théâtre">Théâtre</option>
                    <option value="exposition">Expositions</option>
                    <option value="festival">Festival</option>
                    <option value="animation">Animation</option>
                    <option value="sport">Sport</option>
                    <option value="histoire">Histoire</option>
                    <option value="jeux">Jeux</option>
                    <option value="environnement">Environnement</option>
                    <option value="architecture">Architecture</option>
                    <option value="Atelier">Atelier</option>
                    <option value="film">Film</option>
                    <option value="danse">Danse</option>
                    <option value="lecture">Lecture</option>
                    <option value="culture">Culture</option>
                    <option value="conférence">Conférence</option>
                    <option value="enfants">Enfants</option>
                    <option value="famille">Famille</option>
                </select>
                <input className="h-10 bg-primary rounded bg-primary text-white focus:order-grey-900 border mx-auto mb-5" type="text" placeholder="Lieu" onChange={handleChange} />
                <button type="submit" onClick={e => { navigate('/', { state: { query: value, place: valuePlace } }) }} className="bg-primary hover:bg-success font-semibold py-2 px-4 border hover:border-transparent text-white hover:text-primary rounded lg:mx-auto lg:w-full mt-3 md:mb-3">Filtrer</button>
            </form>
        </div>
    )
}

export default Burger