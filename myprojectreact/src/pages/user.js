import React from 'react'
import './home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'




function User() {

    const [listOfSp, setListofSp] = useState([]);

    useEffect(() => {
        const url = "http://localhost:3001/user";
        axios.get(url).then((response) => {
            setListofSp(response.data);
        });
    }, []);




    const handleDelete = async (id) => {
        const url = "http://localhost:3001/user/" + id;

        axios.delete(url)
            .then(function (response) {

            })
            .catch(function (error) {
                console.error("POST Error:", error);
            });
        window.location.reload();
    }



    return (

        <div className="container">

            <nav className="Sub-menu">
                <div className="left-submenu">
                    <b><a href="/">User</a></b>
                </div>

                <div className="right-submenu">
                    <li><a href="/user">List of user</a></li>
                    <li><a href="/registeruser">Register</a></li>

                </div>
            </nav>

            <div>



                <table width="100% " border={2}>
                    <h1>Danh sách user</h1>
                    {listOfSp.map((item, index) =>
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{item.fullname}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>
                                <button className="edit-button"> <a href={`/edituser/${item._id}`}>Edit</a></button>
                                <button className="delete-button" onClick={() => handleDelete(`${item._id}`)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </table>

            </div>

        </div>


    )
}

export default User