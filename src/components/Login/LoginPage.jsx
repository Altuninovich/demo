import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import * as actions from '../../actions/index';
import {maxLength, required} from "../../utils/validators";
import {Input} from "../FormsControls/FormsControls";
import {Redirect} from "react-router-dom";
import s from "../FormsControls/FormsControls.module.css";

const mapStateToProps = (state) => ({
	authentication: state.authentication,
	dataServerErrorFormValidation: state.dataServerErrorFormValidation,
	captchaUrl: state.authentication.captchaUrl,
});
const actionCreators = {
	authenticationPostThunk: actions.authenticationPostThunk,
};

class LoginForm extends React.Component {
	submit = (formData) => {
		this.props.authenticationPostThunk(formData);
		this.props.reset();
	}

	render() {
		const {authentication, handleSubmit, dataServerErrorFormValidation, captchaUrl} = this.props;

		if (authentication.isAuth) {
			return <Redirect to={"/profile"}/>
		}

		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={handleSubmit(this.submit)}>
					<div>
						<Field placeholder={"Login"}
							   name={"login"}
							   component={Input}
							   validate={[required]}
						/>
					</div>
					<div>
						<Field placeholder={"Password"}
							   name={"password"}
							   component={Input}
							   validate={[required]}
						/>
					</div>
					<div>
						<Field component={'input'}
							   name={"rememberMe"}
							   type={"checkbox"}
						/> remember me
					</div>
					{captchaUrl && <img src={captchaUrl}/>}
					<div className={s.error}>{dataServerErrorFormValidation && dataServerErrorFormValidation}</div>
					<div>
						<button>Login</button>
					</div>
				</form>
			</div>
		)
	}
};

const ConnectedLoginForm = connect(mapStateToProps, actionCreators)(LoginForm);
export default reduxForm({form: 'login'})(ConnectedLoginForm);
