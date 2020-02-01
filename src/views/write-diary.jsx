import React from 'react'
import axios from '../utils/request'
import { TextareaItem, Toast } from 'antd-mobile'

function Header(props) {
  const style = {
    wrap: {
      display: 'flex',
      color: '#fff',
      fontSize: '1.2rem',
      height: '3rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1rem',
      background: '#53a6db'
    },
    cancel: {
      color: '#0e80d2'
    }
  }

  return (
    <div style={style.wrap}>
      <span onClick={props.onClickCancel} style={style.cancel}>
        取消
      </span>
      <span onClick={props.onCLickConfirm}>发布</span>
    </div>
  )
}
class WriteDiary extends React.Component {
  componentDidMount() {
    this.autoFocusInst.focus()
  }
  onClickCancel() {
    this.props.history.push('/index')
  }
  async onCLickConfirm() {
    // console.log('111', this.state.content)
    const { content } = this.state
    const user = JSON.parse(window.localStorage.getItem('user'))
    await axios.post('/diary/', {
      id: user.id,
      content
    })
    Toast.success('发布成功', 1.5, _ => {
      this.props.history.push('/index')
    })
  }
  onChange(value) {
    this.setState({
      content: value
    })
  }

  render() {
    return (
      <div>
        <Header
          onClickCancel={this.onClickCancel.bind(this)}
          onCLickConfirm={this.onCLickConfirm.bind(this)}
        ></Header>
        <TextareaItem
          rows="16"
          placeholder="从前车马很慢书信很远一生只够爱一个人"
          ref={el => (this.autoFocusInst = el)}
          count="2000"
          onChange={this.onChange.bind(this)}
          autoHeight
        />
      </div>
    )
  }
}

export default WriteDiary
