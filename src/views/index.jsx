import React from 'react'
import { Tabs } from 'antd-mobile'
import axios from '../utils/request'
import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import RList from '../components/List'
import AddButton from '../components/AddButton'
import '../styles/register.css'

class Index extends React.Component {
  constructor() {
    super()
  }
  onClickButton() {
    this.props.history.push('/writeDiary')
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
        <Tabs
          tabs={tabs2}
          initialPage={1}
          renderTab={tab => <span>{tab.title}</span>}
        >
          <div style={style.tabBox}>
            <RList></RList>
          </div>
          <div>Content of second tab</div>
        </Tabs>
        {/* <Header></Header> */}
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
