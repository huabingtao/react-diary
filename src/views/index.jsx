import React from 'react'
import { Tabs, PullToRefresh, Toast } from 'antd-mobile'
import axios from '../utils/request'
import Header from '../components/Header'
import RList from '../components/List'
import AddButton from '../components/AddButton'
import NoData from '../components/NoData'
import '../styles/register.css'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      allDiarys: [],
      myDiarys: [],
      visible: true,
      selected: '',
      tabIndex: 0
    }
  }
  componentDidMount() {
    this._getAllDiarys()
  }
  onClickButton() {
    this.props.history.push('/writeDiary')
  }

  async _getMyDiarys() {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (!user) {
      this.setState({
        refreshing: false
      })
      return
    }
    const res = await axios.get('diary/myDiary', {
      params: {
        id: user.id,
        start: 0,
        count: 10
      }
    })
    this.setState({
      myDiarys: res.data,
      refreshing: false
    })
  }
  onClickDiary(item) {
    this.props.history.push(`diaryDetail/${item.id}`)
  }
  onClickFavor(item, e) {
    e.stopPropagation()
    const { id, uid } = item
    this._favor(id, uid)
  }
  onTabClick(tab, index) {
    if (!this.isDidMyDiary && index === 1) {
      this._getMyDiarys()
      this.isDidMyDiary = true
    }
    this.setState({
      tabIndex: index
    })
  }
  onTabRight() {
    const storage = window.localStorage
    storage.removeItem('user')
    this.props.history.push('/login')
  }

  async _favor(diary_id, uid) {
    await axios.post('/favor/', {
      diary_id,
      uid
    })
    const { allDiarys, myDiarys, tabIndex } = this.state
    if (tabIndex === 0) {
      allDiarys.map(diary => {
        if (diary.id === diary_id) {
          diary.isFavor = 1
          diary.favor_nums = diary.favor_nums + 1
        }
      })
    } else {
      myDiarys.map(diary => {
        if (diary.id === diary_id) {
          diary.isFavor = 1
          diary.favor_nums = diary.favor_nums + 1
        }
      })
    }
    this.setState({
      allDiarys,
      myDiarys
    })
  }
  async _getAllDiarys() {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const res = await axios.get('diary', {
      params: {
        uid: user.id
      }
    })
    this.setState({
      allDiarys: res.data,
      refreshing: false
    })
  }
  render() {
    const style = {
      tabBox: {
        marginTop: '1rem'
      },
      addButton: {
        position: 'fixed',
        bottom: '5rem',
        right: '2rem',
        opacity: '0.8'
      }
    }
    const tabs = [
      { title: '广场', sub: '1' },
      { title: '我的', sub: '2' }
    ]
    return (
      <div className="index-container">
        <Header onTabRight={this.onTabRight.bind(this)}></Header>
        <Tabs
          tabs={tabs}
          onTabClick={this.onTabClick.bind(this)}
          renderTab={tab => <span>{tab.title}</span>}
        >
          <PullToRefresh
            damping={60}
            direction="down"
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true })
              this._getAllDiarys()
            }}
          >
            <div style={style.tabBox}>
              {this.state.allDiarys.length !== 0 ? (
                <RList
                  list={this.state.allDiarys}
                  onClickDiary={this.onClickDiary.bind(this)}
                  onClickFavor={this.onClickFavor.bind(this)}
                ></RList>
              ) : (
                <NoData></NoData>
              )}
            </div>
          </PullToRefresh>

          <PullToRefresh
            damping={60}
            direction="down"
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true })
              this._getMyDiarys()
            }}
          >
            <div style={style.tabBox}>
              {this.state.myDiarys.length !== 0 ? (
                <RList
                  list={this.state.myDiarys}
                  onClickDiary={this.onClickDiary.bind(this)}
                  onClickFavor={this.onClickFavor.bind(this)}
                ></RList>
              ) : (
                <NoData></NoData>
              )}
            </div>
          </PullToRefresh>
        </Tabs>
        <div style={style.addButton}>
          <AddButton onClickButton={this.onClickButton.bind(this)}></AddButton>
        </div>
      </div>
    )
  }
}

export default Index
