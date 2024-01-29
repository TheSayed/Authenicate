import React, { useContext, useState } from 'react';
import Form from '@rjsf/core';
import validator from "@rjsf/validator-ajv8";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext.js';

const Login = () => {
    const [formData, setFormData] = useState({});
    const [validationError, setValidationError] = useState(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { setUserToken } = useContext(UserContext)
    const validationSchema = Yup.object(
        {
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
        }
    );



    const schema = Object.assign({
        title: "Registration form",
        type: "object",
        properties: {
            email: { type: "string", title: "email", format: 'email' },
            password: { type: "string", title: "password", format: 'password' },
        },
        required: ['email', 'password'],
    });



    const handleChange = ({ formData }) => {
        setFormData(formData);
    };

    const handleSubmit = async ({ formData }) => {
        validationSchema.validate(formData, { abortEarly: false })
            .then(() => {
                setValidationError(null);
                setFormData({});
            })
            .catch((error) => {
                setValidationError(error.errors.join(', '));
            });

        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formData);
            if (response.data && response.data.message === 'success') {
                navigate('/home', { push: true });

                setUserToken(response?.data.token)

            } else {
                setError(response.data.message)

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
        </Form>

    </>

};

export default Login;


