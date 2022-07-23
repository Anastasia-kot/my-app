import React, { PureComponent } from 'react';
// import styles from './ProfileInfo.module.css';
// import avatarImg from '../../../pictures/avatarImg.png';
// import Preloader from '../../Services/Preloader';
// import { Navigate } from 'react-router-dom';
// import { withAuThRedirect } from '../../../HOC/AuthRedirect';



class ProfileStatus extends PureComponent {
       
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        
        this.setState({
            editMode: true
        })
         this.forceUpdate()
    }
    

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
         this.forceUpdate()
    }


    componentDidUpdate (prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input onBlur={this.deActivateEditMode} 
                        onChange={(e)=>this.setState({status: e.currentTarget.value})}
                        > 
                            {/* {this.props.status}   */}
                        </input>
                    : <span onDoubleClick={this.activateEditMode}>
                        {this.state.status
                            ? this.state.status
                            :'no status'
                            }
                        </span>
                }
            </div>);
    }
}

export default ProfileStatus;