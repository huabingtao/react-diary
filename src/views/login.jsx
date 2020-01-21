import React from 'react'
import axios from 'axios'
import { List, InputItem, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import '../styles/register.css'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  onLogin() {
    const { email, password } = this.state
    axios
      .post('http://localhost:3000/user/login', {
        email,
        password
      })
      .then(res => {
        console.log(res)
        Toast.success('login success', 1)
      })
  }
  onChangeEmail(email) {
    this.setState({
      email
    })
  }
  onChangePassword(password) {
    this.setState({
      password
    })
  }
  render() {
    return (
      <div className="login-container">
        <div className="logo">
          <svg className="icon svg-icon" aria-hidden="true">
            <use href="#icon-bianjilan" />
          </svg>
          <h1>备忘录</h1>
        </div>
        <div className="input">
          <List>
            <InputItem
              type="text"
              placeholder="input your email"
              onChange={this.onChangeEmail.bind(this)}
            >
              邮箱
            </InputItem>
            <InputItem
              type="password"
              placeholder="****"
              onChange={this.onChangePassword.bind(this)}
            >
              密码
            </InputItem>
          </List>
        </div>
        <div className="btn-wrap">
          <Button
            className="btn"
            type="primary"
            onClick={this.onLogin.bind(this)}
          >
            登录
          </Button>
          没有账号?
          <Link className="btn-link" to="/register">
            注册
          </Link>
        </div>
      </div>
    )
  }
}

export default Login
