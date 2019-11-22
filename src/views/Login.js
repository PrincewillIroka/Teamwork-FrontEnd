import React, { Component } from 'react'
import { connect } from 'react-redux'
import MaterialIcon, { colorPalette } from 'material-icons-react';
import styled from 'styled-components'
import bgImage from '../assets/undraw_interaction_design_odgc.svg'
import logo from '../assets/logo.png'
import { url } from '../config/config'
import { Redirect } from 'react-router-dom';
import { populateUserData } from '../store/actions'
import Spinner from '../components/global/Spinner'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            email: '',
            password: '',
            userData: JSON.parse(sessionStorage.getItem('userData')),
            isLoading: false
        }
    }

    componentDidMount() {
        if (this.state.userData) {
            window.location.replace("/")
        }
    }

    handleChange = (type, e) => {
        if (type === 'email') {
            this.setState({
                message: '',
                email: e.target.value
            })
        } else if (type === 'password') {
            this.setState({
                message: '',
                password: e.target.value
            })
        }
    }

    handleLogin = (e) => {
        e.preventDefault()
        if (!this.state.email) {
            this.setState({
                message: 'Email cannot be empty'
            })
        } else if (!this.state.password) {
            this.setState({
                message: 'Password cannot be empty'
            })
        } else {
            if (!this.isValidEmail(this.state.email)) {
                this.setState({
                    message: 'Please enter a valid email address'
                })
            } else {
                this.setState({
                    isLoading: true
                })
                const signInUrl = url + '/api/v1/auth/signin'
                const email = this.state.email
                const password = this.state.password
                fetch(signInUrl, {
                    method: "POST",
                    body: JSON.stringify({ email, password })
                }).then(response => {
                    return response.json()
                }).then(async value => {
                    if (value.hasOwnProperty('status')) {
                        const { status, data } = value
                        if (status === 'success') {
                            // await this.props.populateUserData(data)
                            await sessionStorage.setItem('userData', JSON.stringify(data))
                            window.location.replace("/")
                        } else {
                            this.setState({
                                message: 'Invalid login',
                                isLoading: false
                            })
                        }
                    } else {
                        this.setState({
                            message: 'Invalid login',
                            isLoading: false
                        })
                    }
                }).catch(err => console.log(err))
            }
        }
    }

    isValidEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    render() {

        return (
            <Wrapper>
                <div className='login-container'>
                    <div className="f-div">
                        <img src={logo} alt="App Logo" className="appLogo" />
                        <div className="form-container">
                            <span>Sign In</span>
                            <form>
                                <span className="message-div">{this.state.message}</span>
                                <div>
                                    <MaterialIcon icon="person" />
                                    <input type="email" placeholder="Email" value={this.state.email}
                                        onChange={e => this.handleChange('email', e)} />
                                </div>
                                <div>
                                    <MaterialIcon icon="vpn_key" />
                                    <input type="password" placeholder="Password" value={this.state.password}
                                        onChange={e => this.handleChange('password', e)} />
                                </div>
                                <button className={`${this.state.isLoading ? 'disabled-btn' : ''}`} onClick={e => this.handleLogin(e)}>
                                    {this.state.isLoading ?
                                        <Spinner spinnerHeight={10} spinnerWidth={10} border={7} /> :
                                        <div className="sign-in-text">Sign In</div>
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="s-div">
                        <img src={bgImage} alt='Background Image' className="bgImage" />
                    </div>
                </div>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.userReducer.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        populateUserData: (data) => {
            dispatch(populateUserData(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

const Wrapper = styled.div`
    .login-container{
        display:flex;
        height:100vh;

        .f-div{
            width: 30%;
            background-color:#294ba1;
            display: flex;
            flex-direction:column;
            align-items: center;

            .appLogo{
                width: 80px;
                height: 80px;
                border-radius: 50%;
                margin: 50px 0 100px;
            }

            .form-container{
                display: flex;
                flex-direction:column;
                align-items: center;
                >span:nth-child(1){
                    color: #fff;
                    font-size: 18px;
                    font-family: Arial;
                    margin-bottom: 50px;
                }

                >form{
                    display: flex;
                    flex-direction:column;
                    width: 100%;

                    .message-div{
                        display:block;
                        color: #f44336;
                        text-align:center;
                        font-size: 14px;
                        margin-bottom: 3px;
                    }

                    >div{
                        display: flex;
                        background-color: #fff;
                        border:1px solid #ccc;
                        border-radius:3px;
                        padding: 3px;
                        margin-bottom:20px;

                            input{
                            border:none;
                            outline:none;
                            padding: 5px 7px;
                            font-size: 16px;
                        }

                    }

                    >button{
                        margin-top: 30px;
                        padding: 7px 0;
                        font-weight: bold;
                        font-size: 16px;
                        color:#294ba1;
                        background-color: #fff;
                        outline:none;
                        border:1px solid transparent;
                        border-radius:3px;
                        &:hover{
                            background-color:#294ba1;
                            color: #fff;
                            border: 1px solid #fff;
                        }
                    }

                    .disabled-btn{
                        pointer-events: none;
                    }

                    
                }
            }
        }

        .s-div{
            width: 60%;
            display:flex;
            align-items:center;
            justify-content:center;
            .bgImage{
                height: 50%;
                width:50%;
            }
        }

    }

    @media(max-width: 840px){
        .f-div{
            width: 50% !important;
        }

        .s-div{
            width: 50% !important;

        }
    }

    @media(max-width: 520px){
        .f-div{
            width: 100% !important;
        }

        .s-div{
            display:none !important;
        }
    }
`