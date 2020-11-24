import React, {useState} from 'react';
import s from './Profile.module.css';
import ava from "../../../assets/images/thumb-251882.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";

const Profile = (props) => {
    const {userProfile, isOwner, savePhotoThunk, saveProfileThunk} = props;
    let avatar;
    if (userProfile) {
        avatar = userProfile.photos.large ? userProfile.photos.large : ava;
    } else {
        avatar = ava;
    }

    const [editMode, setEditMode] = useState(false);

    const onMainPhotoSelected = ({target: {files}}) => {
        if (files.length) {
            savePhotoThunk(files[0]);
        }
    };

    const saveDataForm = (dataForm) => {
        saveProfileThunk(dataForm).then(() => {
            setEditMode(false);
        })
    }

    return (
        <div className={s.content}>
            <div className={s.item}>
                <img src={avatar}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataFormReduxForm initialValues={userProfile} saveDataForm={saveDataForm}/>
                    : userProfile && <ProfileData goToEditMode={() => setEditMode(true)} {...props}/>
                }
            </div>
            <ProfileStatusWithHooks {...props} />
        </div>
    )
};

const ProfileData = (props) => {
    const {userProfile, isOwner, goToEditMode} = props;
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
            <div><b>Full name</b>: {userProfile.fullName}</div>
            <div><b>Looking for a job</b>: {userProfile.lookingForAJob ? 'yes' : 'no'}</div>
            {
                <div><b>Contacts</b>:{
                    Object.entries(userProfile.contacts)
                        .filter((el) => true)
                        .map(([key, val]) => <div className={s.contact} key={key}><b>{key}: </b>{val}</div>)
                }
                </div>
            }
        </div>
    )
};

export default Profile;
