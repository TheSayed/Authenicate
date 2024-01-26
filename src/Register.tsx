import React from 'react';
import Form from '@rjsf/core';
import * as Utils from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema } from '@rjsf/utils';

const schema: RJSFSchema = {
    title: "Test form",
    type: "object",
    properties: {
        name: {
            type: "string"
        },
        age: {
            type: "number"
        }
    }
};

const uiSchema = {
    name: {
        classNames: "custom-class-name"
    },
    age: {
        classNames: "custom-class-age"
    }
};

const Register = () => {
    return <Form schema={schema} uiSchema={uiSchema} validator={validator} />;
};

export default Register;