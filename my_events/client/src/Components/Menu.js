import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Menu = () => {

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
    }

    return (
        <div className="flex flex-col ml-3 mr-3 md:hidden sm:hidden">
            <label className="text-white text-lg md:hidden" htmlFor="form">Filtres</label>
            <form className="flex flex-col md:flex-row md:justify-center md:items-center" onSubmit={onSubmit}>
                    <select name="category" className="rounded h-10 bg-secondary hover:bg-secondary hover:text-white md:mr-5 md:ml-5 md:w-max border" onChange={handleDropdownChange}>
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
                    <input className="h-10 bg-secondary rounded hover:text-white focus:order-grey-900 md:mr-5 md:ml-5 md:w-max border lg:mt-2 p-1" type="text" placeholder="Lieu" onChange={handleChange} />
                <button type="submit" onClick={e => { navigate('/', { state: { query: value, place: valuePlace } }) }} className="bg-primary hover:bg-success font-semibold py-2 px-4 border hover:border-transparent text-white hover:text-primary rounded lg:mx-auto lg:w-full mt-3 md:mb-3">Filtrer</button>
            </form>
        </div>
    )
}

export default Menu;