import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

async function capnhat(distributorApi, object) {
    await axios.put(distributorApi, object)
        .then(function (response) {

        })
        .catch(function (error) {
            console.log('POST Error: ', error);
        });
}

async function doc(courseApi) {
    try {
        const response = await axios.get(courseApi);
        return response.data;
    } catch (error) {
        console.error('GET Error', error);
        throw error;
    }
}

function Editdistributor() {

    const { id } = useParams();
    const data = { name: "Company" };
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
                        const url = "http://localhost:3001/distributor/" + id;
                        const result = await capnhat(url, inputdata);
                        console.log(result)
                        swal({
                            title: "Update Successful!!",
                            icon: "success",
                        });
                        setTimeout(() => {
                            window.location.href = '/distributor';
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
                const url = "http://localhost:3001/distributor/" + id;
                const distributor = await doc(url);
                setInputdata(distributor);
            } catch (error) {

            }
        }
        fetchProductById();
    }, [id]);



    return (




        <div>
            <form className="form-container">
                <label className="form-label">Distributor name: </label><br />
                <input type='text' name='name' value={inputdata.name} onChange={handleData} className="form-input" /><br />
                <button className="submit-button" onClick={handleSubmit}>Update</button>
            </form>
        </div>
    )
}

export default Editdistributor

