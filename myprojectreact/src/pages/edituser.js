import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

async function capnhat(userApi, object) {
    await axios.put(userApi, object)
        .then(function (response) {

        })
        .catch(function (error) {
            console.log('POST Error: ', error);
        });
}

async function doc(courseApi) {
    // return await axios.get(courseApi)
    //     .then(function (response) {
    //         //handle successful response
    //         return response.data;
    //         // console.log('GET Resp)
    //     })
    //     .catch(function (error) {
    //         console.error('GET Error ', error);
    //     });
    try {
        const response = await axios.get(courseApi);
        return response.data;
    } catch (error) {
        console.error('GET Error', error);
        throw error;
    }
}

function Edituser() {

    const { id } = useParams();
    const data = { fullname: "abc", phone: "csd", address: "cas" };

    const [inputdata, setInputdata] = useState(data);

    const handleData = (e) => {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("zoo");
        swal({
            title: "Xac nhan?",
            text: "Xac nhan cap nhat user",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        const url = "http://localhost:3001/user/" + id;
                        const result = await capnhat(url, inputdata);
                        console.log(result)
                        swal({
                            title: "Update Successful!!",
                            icon: "success",
                        });
                        setTimeout(() => {
                            window.location.href = '/user';
                        }, 2000);
                    } catch (error) {
                        console.log(error);
                        swal({
                            title: "Update fail!",
                            icon: "error",
                        });
                    }
                }
            })
    }

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const url = "http://localhost:3001/user/" + id;
                const user = await doc(url);
                setInputdata(user);
            } catch (error) {

            }
        }
        fetchProductById();
    }, [id]);

    return (
        <div>
            <form className="form-container">
                <label className="form-label">Full Name</label>
                <input type='text' name='fullname' value={inputdata.fullname} onChange={handleData} className="form-input" />

                <label className="form-label">Phone</label>
                <input type='text' name='phone' value={inputdata.phone} onChange={handleData} className="form-input" />

                <label className="form-label">Address</label>
                <input type='text' name='address' value={inputdata.address} onChange={handleData} className="form-input" />

                <button onClick={handleSubmit} className="submit-button">Update</button>
            </form>

        </div>
    )
}

export default Edituser