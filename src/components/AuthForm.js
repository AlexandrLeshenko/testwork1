import React from 'react'
import { Field, reduxForm } from 'redux-form'


const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less'
    }
    return errors
};

const AuthForm = (props) => {
    const { handleSubmit, submitting, } = props
    const log = (values)=>{
        props.loginUser(values.username,values.password)}

    return <form onSubmit={handleSubmit(log)}>
        {props.loginStatus.error ? <span> {props.loginStatus.message} </span> : <span></span>}
        <Field name="username" type="text" component={Input} label="username" />
        <Field name="password" type="password" component={Input} label="password" />
        <div>
            <button type="submit" disabled={submitting}>
                Go
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
})(AuthForm)