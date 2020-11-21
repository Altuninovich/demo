import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea, Input} from "../../FormsControls/FormsControls";
import s from "./Profile.module.css";
import {maxLength, required} from "../../../utils/validators";

const ProfileDataForm = (props) => {
    const {handleSubmit, saveDataForm, initialValues, error} = props;

    return (
        <form onSubmit={handleSubmit(saveDataForm)}>
            <div><button>save</button></div>
            {error && <div className={s.formError}>{error}</div>}
            <div><b>Full name</b>:
                <Field name={"fullName"}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <b>Looking for a job</b>:
                <Field component={'input'}
                       name={"lookingForAJob"}
                       type={"checkbox"}
                />
            </div>
            <div>
                <b>Looking for a job description</b>:
                <Field component={Input}
                       name={"lookingForAJobDescription"}
                       validate={[required]}
                />
            </div>
            <div>
                <b>About me</b>:
                <Field component={'textarea'}
                       name={"aboutMe"}
                />
            </div>

            {
                <div><b>Contacts</b>:
                    {Object.keys(initialValues.contacts).map((key) => {
                       return (
                           <div key={key}>
                            <b>{key}</b>:
                            <Field component={Input}
                                   name={'contacts.' + key}
                            />
                        </div>
                       )
                    })}
                </div>
            }
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;