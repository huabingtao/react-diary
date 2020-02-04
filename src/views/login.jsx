import React from 'react'
import axios from '../utils/request'
import { List, InputItem, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import '../styles/register.css'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  async onLogin() {
    const { email, password } = this.state
    const res = await axios.post('user/login', {
      email,
      password
    })
    const storage = window.localStorage
    storage.setItem('user', JSON.stringify(res.data.user))
    Toast.success('登录成功', 1.5, _ => {
      this.props.history.push('/index')
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
          <h1>吾记</h1>
        </div>
        <div className="input">
          <List>
            <InputItem
              type="text"
              clear={true}
              placeholder="input your email"
              onChange={this.onChangeEmail.bind(this)}
            >
              邮箱
            </InputItem>
            <InputItem
              clear={true}
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
