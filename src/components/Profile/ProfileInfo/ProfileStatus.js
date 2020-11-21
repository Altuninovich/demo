import React from 'react';
//не используется, оставил для тестов
class ProfileStatus extends React.Component {

	state = {
		editMode: false,
		status: this.props.userStatus,
	}

	activateEditMode = () => {
		this.setState({
			editMode: true,
		})
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false,
		});
		this.props.updateStatusThunk(this.state.status);
    }

    changeText = (e) => {
		this.setState({
			status: e.target.value,
		})
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.userStatus,
			});
		}
	}

	render() {
		const {editMode, status} = this.state;
		return (
			<div>
			{!editMode &&
				<div>
				    <span onDoubleClick={this.activateEditMode}>{this.props.userStatus}</span>
				</div>     
			}
			{editMode &&
				<div>
				    <input onChange={this.changeText} autoFocus={true} onBlur={this.deactivateEditMode} value={status} />
				</div>     
			}
			</div>
			)
	}


};

export default ProfileStatus;

