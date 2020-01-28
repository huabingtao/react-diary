import React from 'react'
import { TextareaItem } from 'antd-mobile'

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
    publish: {
      color: '#53a6db'
    }
  }

  return (
    <div style={style.wrap}>
      <span onClick={props.onClickCancel}>取消</span>
      <span style={style.puhlish}>发布</span>
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

  render() {
    return (
      <div>
        <Header onClickCancel={this.onClickCancel.bind(this)}></Header>
        <TextareaItem
          rows="16"
          placeholder="从前车马很慢书信很远一生只够爱一个人"
          ref={el => (this.autoFocusInst = el)}
          count="2000"
          autoHeight
        />
      </div>
    )
  }
}

export default WriteDiary
