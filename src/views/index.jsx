import React from 'react'
import { Tabs } from 'antd-mobile'
import axios from '../utils/request'
import Header from '../components/Header'
import RList from '../components/List'
import AddButton from '../components/AddButton'
import '../styles/register.css'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      diars: []
    }
  }
  onClickButton() {
    this.props.history.push('/writeDiary')
  }
  async getAllDiarys() {
    // const user = JSON.parse(window.localStorage.getItem('user'))
    const res = await axios.get('diary')
    this.setState({
      diars: res.data
    })
    console.log('res.data:', res.data)
  }
  onClickDiary(item) {
    console.log(item)
    this.props.history.push('/diaryDetail', { item })
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
    const tabs2 = [
      { title: '广场', sub: '1' },
      { title: '我的', sub: '2' }
    ]
    return (
      <div className="index-container">
        <Header></Header>
        <Tabs tabs={tabs2} renderTab={tab => <span>{tab.title}</span>}>
          <div style={style.tabBox}>
            {this.state.diars.length && (
              <RList
                list={this.state.diars}
                onClickDiary={this.onClickDiary.bind(this)}
              ></RList>
            )}
          </div>
          <div>Content of second tab</div>
        </Tabs>

        {/* <div style={styl.searchBox}>
          <SearchBox></SearchBox>
        </div> */}
        <div style={style.addButton}>
          <AddButton onClickButton={this.onClickButton.bind(this)}></AddButton>
        </div>
      </div>
    )
  }
}

export default Index
