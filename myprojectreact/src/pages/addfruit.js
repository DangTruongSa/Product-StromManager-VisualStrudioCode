import React from 'react'

import './home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Addfruit() {
    const [listOfDis, setListofDis] = useState([]);

    useEffect(() => {
        const url = "http://localhost:3001/distributor";
        axios.get(url)
            .then(response => {
                setListofDis(response.data);
            })
            .catch(error => {
                console.error('Error fetching distributors:', error);
            });
    }, []);

    const initialValues = {
        name: "",
        quantity: 0,
        price: 0,
        status: 0,
        image: "",
        description: "",
        id_distributor: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2).max(45).required(),
        quantity: Yup.number().required(),
        price: Yup.number().required(),
        status: Yup.number().required(),
        image: Yup.string().required(),
        description: Yup.string().required(),
        id_distributor: Yup.string().required()

    });

    //call api
    const onSubmit = async (values) => {
        try {
            const formdata = new FormData();
            formdata.append('name', values.name);
            formdata.append('quantity', values.quantity);
            formdata.append('price', values.price);
            formdata.append('status', values.status);
            formdata.append('image', values.image);
            formdata.append('description', values.description);
            formdata.append('id_distributor', values.id_distributor);

            const res = await axios.post("http://localhost:3001/add-fruit", formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', res.data);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div class='container'>

            <nav class="Sub-menu">
                <div class="left-submenu">
                    <b><a href="">Fruit</a></b>
                </div>

                <div class="right-submenu">
                    <li><a href="/fruit">List of fruit</a></li>
                    <li><a href="/addfruit">Register</a></li>

                </div>
            </nav>
            <div id="tableuser">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ setFieldValue }) => (
                        <Form className="form-container">
                            <label className="form-label" htmlFor="name">Name</label>
                            <ErrorMessage name="name" component="span" className="error-message" />
                            <Field id="name" name="name" placeholder="Enter name" className="form-input" />

                            <label className="form-label" htmlFor="quantity">Quantity</label>
                            <ErrorMessage name="quantity" component="span" className="error-message" />
                            <Field id="quantity" name="quantity" placeholder="Enter quantity" className="form-input" />

                            <label className="form-label" htmlFor="price">Price</label>
                            <ErrorMessage name="price" component="span" className="error-message" />
                            <Field id="price" name="price" placeholder="Enter price" className="form-input" />

                            <label className="form-label" htmlFor="status">Status</label>
                            <ErrorMessage name="status" component="span" className="error-message" />
                            <Field id="status" name="status" placeholder="Enter status" className="form-input" />

                            <label className="form-label" htmlFor="image">Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={(event) => {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                }}
                                className="file-input"
                            />

                            <label className="form-label" htmlFor="description">Description</label>
                            <ErrorMessage name="description" component="span" className="error-message" />
                            <Field id="description" name="description" placeholder="Enter description" className="form-input" />

                            <label className="form-label" htmlFor="id_distributor">ID Distributor</label>
                            <ErrorMessage name="id_distributor" component="span" className="error-message" />
                            <Field as="select" id="id_distributor" name="id_distributor" className="form-input">
                                <option value="">Chọn nhà phân phối</option>
                                {listOfDis.map(e => (
                                    <option key={e._id} value={e._id}>{e.name}</option>
                                ))}
                            </Field>

                            <button type="submit" className="submit-button">Thêm sản phẩm</button>
                        </Form>
                    )}
                </Formik>

            </div>


        </div>
    )
}

export default Addfruit