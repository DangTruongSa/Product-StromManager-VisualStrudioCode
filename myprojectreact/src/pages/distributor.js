import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Distributor() {
    const [listOfDis, setListofDis] = useState([]);

    useEffect(() => {
        const url = "http://localhost:3001/distributor";
        axios.get(url).then((response) => {
            setListofDis(response.data);
        });
    }, []);



    const handleDelete = async (id) => {
        const url = "http://localhost:3001/distributor/" + id;

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
                    <b><a href="">Distributor</a></b>
                </div>

                <div class="right-submenu">
                    <li><a href="/distributor">List of distributor</a></li>
                    <li><a href="/adddistributor">Add Distributor</a></li>

                </div>
            </nav>
            <h1 style={{ width: "500px" }}>Danh sách distributor</h1>
            <table width="100% " border={1}>

                {listOfDis.map((item, index) =>
                    <tr key={index} >
                        <td style={{ width: "30px", height: "15px" }}>{index + 1}</td>
                        <td>{item.name}</td>
                        <td style={{ width: "300px" }}>
                            <button className="edit-button"> <a href={`/editdistributor/${item._id}`}>Edit</a></button>
                            <button className="delete-button" onClick={() => handleDelete(`${item._id}`)}>Delete</button>
                        </td>
                    </tr>
                )}
            </table>

        </div>
    )
}

export default Distributor