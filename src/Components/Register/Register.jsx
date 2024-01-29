import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from "@rjsf/validator-ajv8";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const [formData, setFormData] = useState({});
    const [validationError, setValidationError] = useState(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const validationSchema = Yup.object(
        {
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
            rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Re-enter password is required'),
            phone: Yup.string().min(10, 'Phone number must be at least 11 digits long').required('Phone number is required')
        }
    );



    const schema = Object.assign({
        title: "Registration form",
        type: "object",
        properties: {
            name: { type: "string", title: "name" },
            email: { type: "string", title: "email", format: 'email' },
            password: { type: "string", title: "password", format: 'password' },
            rePassword: { type: "string", title: "rePassword", format: 'password' },
            phone: { type: "string", title: "phone" },
        },
        required: ['name', 'email', 'password', 'rePassword', 'phone'],
    });



    const handleChange = ({ formData }) => {
        setFormData(formData);
    };

    const handleSubmit = async ({ formData }) => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setValidationError(null);
            setFormData({});
        } catch (error) {
            setValidationError(error.errors.join(', '));
        }

        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formData);

            if (response.data && response.data.message === 'success') {
                navigate('/login');
            } else {
                setError(response.statusText);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };


    return <>

        <Form
            id="myForm"
            validator={validator}
            schema={schema}
            onSubmit={handleSubmit}
            onChange={handleChange}
            formData={formData}
            className='container'
        >
            {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </Form>

    </>

};

export default Register;


