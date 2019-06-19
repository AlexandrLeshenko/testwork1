import React from "react";
import AuthForm from "./AuthForm";

class Auth extends React.Component {
    render(props) {
        return <div>
            {this.props.login ? 'hello Admin' : <AuthForm
                loginUser={this.props.loginUser}
                loginStatus = {this.props.loginStatus}
            />}
            </div>
    }
}
export default Auth;

