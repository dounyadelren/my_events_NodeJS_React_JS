import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../assets/css/infoSorties.css'

const Chat = (props) => {

    let { id } = useParams();
    let subId = id.replace("id=", "");

    const [mess, setMess] = useState();
    const [mymess, setMyMess] = useState('');

    const handleDropdownChange = (e) => {
        e.preventDefault();
        setMyMess(e.target.value);
    }

    useEffect(() => {
        const formInfo = {
            id_event: subId
        }

        fetch(`http://localhost:8000/chat/${subId}`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(data => setMess(data))
    }, [mymess])

    const onSubmit = (e) => {
        e.preventDefault();

        const formInfo = {}

        for (let key in e.target.elements) {
            if (['INPUT'].includes(e.target.elements[key].tagName) && e.target.elements[key].value !== '') {
                formInfo[(e.target.elements[key].name)] = (e.target.elements[key].value);
            }
        }

        fetch(`http://localhost:8000/chat`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formInfo)
        })
    }

    return (
        <>
            <p className="text-center">Chatroom</p>
            <main className="lg:ml-20 md:mx-auto">
                <div id="content">
                    <div id="messages">
                        {
                            mess?.map((res,i) => (
                                <div key={i} className="border-0 border-b mt-4">
                                    <p>{res.name} : {res.message} </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <form className="flex justify-center mt-5" onSubmit={onSubmit}>
                    <div className="flex">
                        {
                            props?.state?.event?.map((res, i) => (
                                <input type="hidden" name="id_event" value={res?._id} />
                            ))
                        }
                        <div className="md:flex sm:flex sm:flex-col sm:w-full">
                        <input type="text" className="w-40 text-center text-secondary rounded mr-1" name="name" value={props.state.name} disabled />
                        <input type="text" className="max-w-full rounded bg-white border mr-1 p-2" name="message" placeholder="Entrez votre message" onChange={handleDropdownChange}/>
                        <button type="submit" className="bg-info border hover:border-transparent text-white hover:text-black font-semibold py-2 px-4 rounded">Envoyer</button>
                        </div>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Chat