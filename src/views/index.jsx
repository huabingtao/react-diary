import React from 'react'
import { Tabs, PullToRefresh } from 'antd-mobile'
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
      selected: ''
    }
  }
  onClickButton() {
    this.props.history.push('/writeDiary')
  }
  async getAllDiarys() {
    const res = await axios.get('diary')
    this.setState({
      allDiarys: res.data,
      refreshing: false
    })
  }
  async getMyDiarys() {
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
    this.props.history.push('/diaryDetail', { item })
  }
  onTabClick(tab, index) {
    if (!this.isDidMyDiary && index === 1) {
      this.getMyDiarys()
      this.isDidMyDiary = true
    }
  }
  onTabRight() {
    const storage = window.localStorage
    storage.removeItem('user')
    this.props.history.push('/login')
  }
  componentDidMount() {
    this.getAllDiarys()
  }
  render() {
    const style = {
      tabBox: {
        marginTop: '1rem'
      },
      addButton: {
        position: 'absolute',
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
              this.getAllDiarys()
            }}
          >
            <div style={style.tabBox}>
              {this.state.allDiarys.length !== 0 ? (
                <RList
                  list={this.state.allDiarys}
                  onClickDiary={this.onClickDiary.bind(this)}
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
              this.getMyDiarys()
            }}
          >
            <div style={style.tabBox}>
              {this.state.myDiarys.length !== 0 ? (
                <RList
                  list={this.state.myDiarys}
                  onClickDiary={this.onClickDiary.bind(this)}
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
