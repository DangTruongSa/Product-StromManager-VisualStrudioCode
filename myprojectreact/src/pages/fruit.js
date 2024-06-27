import React from 'react'
import './home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'



function Fruit() {

    const [listOfSp, setListofSp] = useState([]);
    const [listOfDis, setListofDis] = useState([]);

    useEffect(() => {
        const url = "http://localhost:3001/distributor";
        axios.get(url).then((response) => {
            setListofDis(response.data);
        });
    }, []);

    useEffect(() => {
        const url = "http://localhost:3001/fruit";
        axios.get(url).then((response) => {
            setListofSp(response.data);
        });
    }, []);

    const handleDelete = async (id) => {
        const url = "http://localhost:3001/fruit/" + id;

        axios.delete(url)
            .then(function (response) {

            })
            .catch(function (error) {
                console.error("POST Error:", error);
            });
        window.location.reload();
    }



    return (
        <div class="container">

            <nav class="Sub-menu">
                <div class="left-submenu">
                    <b><a href="/fruit">Fruit</a></b>
                </div>

                <div class="right-submenu">
                    <li><a href="/fruit">List of fruit</a></li>
                    <li><a href="/addfruit">Add fruit</a></li>

                </div>
            </nav>

            <div>



                <table width="100% " border={1}>
                    <h1>Danh sách fruit</h1>
                    {listOfSp.map((item, index) =>
                        <tr key={index} >
                            <td style={{ width: "10px", height: "10px" }}>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.status}</td>
                            <td><img src={item.image} alt='Fruit' style={{ width: "50px", height: "50px" }} /></td>
                            <td>{item.description}</td>
                            <td>{listOfDis.find(dis => dis._id === item.id_distributor)?.name || 'Khong tim thay distributor!?'}</td>
                            <td>
                                <button className="edit-button"> <a href={`/editfruit/${item._id}`}>Edit</a></button>
                                <button className="delete-button" onClick={() => handleDelete(`${item._id}`)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </table>

            </div>

        </div>
    )
}

export default Fruit