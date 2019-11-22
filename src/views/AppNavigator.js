import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AdminDashboard from './AdminDashboard'
import EmployeeDashboard from './EmployeeDashboard'

class AppNavigator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: JSON.parse(sessionStorage.getItem('userData'))
        }
    }

    componentDidMount() {
        if (!this.state.userData) {
            // window.location.replace("/login")
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.userData && this.state.userData.accessLevel === 'admin' ? (
                    <AdminDashboard />
                ) : this.state.userData && this.state.userData.accessLevel === 'employee' ? (
                    <EmployeeDashboard />
                ) : null

                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userReducer.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavigator)