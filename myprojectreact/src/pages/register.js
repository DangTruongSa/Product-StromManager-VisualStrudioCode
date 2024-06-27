import React from 'react'
import './home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from './img/logos.png'
import { useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory();
    //add user
    //model
    const initialValues = {
        fullname: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    };
    //validate
    const validationSchema = Yup.object().shape({
        fullname: Yup.string().min(3).max(45).required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        phone: Yup.string().required(),
        address: Yup.string().required()
    });

    //call api
    const onSubmit = (data) => {
        const url = "http://localhost:3001/user"
        axios.post(url, data)
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('POST Error: ', error);
            });
        history.push('/login');
        window.location.reload();
    }
    return (
        <div class="containera">
            <div class="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div class="login-form">
                <h2>Register</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, touched }) => (
                        <Form className="form-container">
                            <label className="form-label" htmlFor="fullname">Full Name</label>
                            <ErrorMessage name="fullname" component="span" className="error-message" />
                            <Field id="fullname" name="fullname" placeholder="Enter full name" className="form-input" />

                            <label className="form-label" htmlFor="email">Email</label>
                            <ErrorMessage name="email" component="span" className="error-message" />
                            <Field id="email" name="email" type="email" placeholder="Enter email" className="form-input" />

                            <label className="form-label" htmlFor="password">Password</label>
                            <ErrorMessage name="password" component="span" className="error-message" />
                            <Field id="password" name="password" type="password" placeholder="Enter password" className="form-input" />

                            <label className="form-label" htmlFor="phone">Phone</label>
                            <ErrorMessage name="phone" component="span" className="error-message" />
                            <Field id="phone" name="phone" placeholder="Enter phone" className="form-input" />

                            <label className="form-label" htmlFor="address">Address</label>
                            <ErrorMessage name="address" component="span" className="error-message" />
                            <Field id="address" name="address" placeholder="Enter address" className="form-input" />

                            <button class="btnlog" type="submit" >Create User</button><br />
                            <label>________________________________________</label><br />
                            <label>Đã có tài khoản ? <a href='/login'>Đăng nhập</a></label>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}

export default Register;