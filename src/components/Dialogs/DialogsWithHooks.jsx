import React, {useState} from 'react';
import s from './Dialogs.module.css';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators";
import {Textarea} from "../FormsControls/FormsControls";

const maxLength200 = maxLength(200);

const DialogsWithHooks = (props) => {

    let [itSen, showAlert] = useState(false);
    let [message, updateMessage] = useState('');
    const resetAlert = () => showAlert(false);

    const sendMessage = (value) => {
        debugger;
        showAlert(true);
        updateMessage(value.newMessageBody);
        setTimeout(resetAlert, 5000);
        props.reset();
    }
    const removeAlert = () => showAlert(false);

    return (
        <div className={s.dialogs}>
            <form onSubmit={props.handleSubmit(sendMessage)}>
                <div>
                    <Field name={'newMessageBody'}
                           component={Textarea}
                           placeholder={'Enter your Message'}
                           validate={[required, maxLength200]}
                    />
                </div>
                <div>
                    <button>SEND</button>
                </div>
            </form>
            {itSen && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Message sent!</strong>{` Message text: ${message}`}
                <button onClick={removeAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            }
        </div>
    )
};


const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(DialogsWithHooks)

export default compose(
    withAuthRedirect
)(AddMessageReduxForm);

