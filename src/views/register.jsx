import React from 'react'
import axios from '../utils/request'
import { List, InputItem, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import '../styles/register.css'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  async onRegister() {
    const { email, nickname, password1, password2 } = this.state
    await axios.post('user/register', {
      email,
      nickname,
      password1,
      password2
    })
    Toast.success('Register Success', 2)
  }
  onChangeEamil(email) {
    this.setState({
      email
    })
  }
  onChangeNickname(nickname) {
    this.setState({
      nickname
    })
  }
  onChangePassword1(password1) {
    this.setState({
      password1
    })
  }
  onChangePassword2(password2) {
    this.setState({
      password2
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
              placeholder="input your email"
              clear={true}
              onChange={this.onChangeEamil.bind(this)}
            >
              邮箱
            </InputItem>
            <InputItem
              type="text"
              placeholder="input your nickname"
              clear={true}
              onChange={this.onChangeNickname.bind(this)}
            >
              昵称
            </InputItem>
            <InputItem
              type="password"
              placeholder="****"
              clear={true}
              onChange={this.onChangePassword1.bind(this)}
            >
              密码
            </InputItem>
            <InputItem
              type="password"
              placeholder="****"
              clear={true}
              onChange={this.onChangePassword2.bind(this)}
            >
              再次输入
            </InputItem>
          </List>
        </div>
        <div className="btn-wrap">
          <Button
            className="btn"
            type="primary"
            onClick={this.onRegister.bind(this)}
          >
            注册
          </Button>
          <Link className="btn-link" to="/login">
            已有账号去登录
          </Link>
        </div>
      </div>
    )
  }
}

export default Register
