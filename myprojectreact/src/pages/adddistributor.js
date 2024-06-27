import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function Adddistributor() {
    //add distribu
    //model
    const initialValues = {
        name: ""
    };
    //validate
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(45).required()
    });
    //call api
    const onSubmit = (data) => {
        const url = "http://localhost:3001/distributor"
        axios.post(url, data)
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('POST Error: ', error);
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

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form className="form-container">
                        <label className="form-label" htmlFor="name">Distributor Name</label>
                        <ErrorMessage name="name" component="span" className="error-message" />
                        <Field id="name" name="name" placeholder="Enter distributor name" className="form-input" />

                        <button type="submit" className="submit-button">Create Distributor</button>
                    </Form>
                )}
            </Formik>




        </div>
    )
}

export default Adddistributor