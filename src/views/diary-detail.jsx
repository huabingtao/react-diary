import React from 'react'
import { Modal, Toast } from 'antd-mobile'
import axios from '../utils/request'
const alert = Modal.alert

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
    feature: {
      display: 'flex',
      width: '100px',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: '-0.5rem'
    },
    icon: {
      width: '2rem',
      height: '2rem',
      padding: '0.2rem',
      color: '#fff'
    }
  }
  return (
    <div style={style.wrap}>
      <span onClick={props.onClickGoback}>返回</span>
      <div style={style.feature}>
        <div onClick={props.onClickDelete}>
          <svg className="icon svg-icon" style={style.icon} aria-hidden="true">
            <use href="#icon-shanchu" />
          </svg>
        </div>
        <div onClick={props.onClickModify}>
          <svg className="icon svg-icon" style={style.icon} aria-hidden="true">
            <use href="#icon-bianji" />
          </svg>
        </div>
      </div>
    </div>
  )
}

class DiaryDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {},
      id: this.props.match.params.id
    }
  }
  componentDidMount() {
    this.getDiaryDetail()
  }
  async getDiaryDetail() {
    const { id } = this.state
    const res = await axios.get(`/diary/${id}`)
    this.setState({
      detail: res.data
    })
  }
  onClickDelete() {
    const { detail } = this.state
    alert('警告⚠️', '确定要删除吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: async () => {
          await axios.delete('/diary/', {
            data: {
              uid: detail.uid,
              id: detail.id
            }
          })
          Toast.success('Delete Success', 1)
          setTimeout(() => {
            this.props.history.goBack()
          }, 500)
        }
      }
    ])
  }
  onClickModify() {
    this.props.history.push('/writeDiary', {
      diaryDetail: this.state.detail
    })
  }
  onClickGoback() {
    this.props.history.goBack()
  }
  render() {
    const style = {
      pad: {
        padding: '0 1.2rem',
        fontSize: '1.2rem',
        lineHeight: '1.5rem'
      },
      feature: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#3e7de0',
        margin: '1.2rem 0 2rem 0'
      },
      ability: {
        display: 'flex',
        marginRight: '-1.2rem'
      },
      abilityItem: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem'
      },
      abilityItemIconSvg: {
        width: '1.4rem',
        height: '1.4rem',
        padding: '0 0.5rem 0'
      }
    }

    return (
      <div>
        <Header
          onClickGoback={this.onClickGoback.bind(this)}
          onClickDelete={this.onClickDelete.bind(this)}
          onClickModify={this.onClickModify.bind(this)}
        ></Header>
        <div style={style.pad}>
          <div style={style.feature}>
            <div>{this.state.detail.create_time}</div>
            <div style={style.ability}>
              <div style={style.abilityItem}>
                <svg
                  className="icon svg-icon"
                  style={style.abilityItemIconSvg}
                  aria-hidden="true"
                >
                  <use href="#icon-xihuanhui" />
                </svg>
                <span>4</span>
              </div>
              <div style={style.abilityItem}>
                <svg
                  className="icon svg-icon"
                  style={style.abilityItemIconSvg}
                  aria-hidden="true"
                >
                  <use href="#icon-eye" />
                </svg>
                <span>27</span>
              </div>
            </div>
          </div>
          <div>{this.state.detail.content}</div>
        </div>
      </div>
    )
  }
}

export default DiaryDetail
