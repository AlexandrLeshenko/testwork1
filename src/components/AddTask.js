import React from 'react'
import { Field, reduxForm } from 'redux-form'


const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'required field'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'required field'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.message) {
        errors.message = 'required field'
    }
    return errors
};

const AddTask = (props) => {
    const { handleSubmit, submitting, } = props
    const add = (values)=>{
        if (!!values.message && !!values.email && !!values.username) {
            props.addTask(values.username,values.email,values.message)
        }
    }


        return <form onSubmit={handleSubmit(add)}>
                <Field name="username" type="text" component={Input} label="username" />
                <Field name="email" type="email" component={Input} label="email" />
                <Field name="message" type="text" component={Input} label="text todo" />
                <div>
                    <button type="submit" disabled={submitting}>
                        add task
                    </button>
                </div>
        </form>
    }

const Input = ({input, label, type, meta: { touched, error }}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
            ((error && <span>{error}</span>) )}
        </div>
    </div>
)



export default reduxForm({
    form: 'task-add-form',
    validate
})(AddTask)


