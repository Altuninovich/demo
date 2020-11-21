import React, {useEffect, useState} from 'react';
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.userStatus);

	const activateEditMode = () => {
		setEditMode(true);
	};
	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatusThunk(status);
	};
	const changeText = (e) => {
		setStatus(e.target.value);
	};
	useEffect(() => {
		setStatus(props.userStatus);
	}, [props.userStatus]);


	return (
		<div>
			{!editMode &&
			<div>
				<span className={s.item} onDoubleClick={activateEditMode}>Status: {props.userStatus}</span>
			</div>
			}
			{editMode &&
			<div>
				<input autoFocus={true} onChange={changeText} onBlur={deactivateEditMode} value={status}/>
			</div>
			}
		</div>
	)


};

export default ProfileStatusWithHooks;