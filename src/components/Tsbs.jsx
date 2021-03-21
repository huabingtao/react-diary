import React from 'react';
import { PullToRefresh } from 'antd-mobile';
import RList from './List';
import NoData from "./NoData";
import '../styles/common.css';
class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      tabList: [
        {
          title: '广场',
        },
        {
          title: '我的',
        },
      ],
      tabIndex: 0,
    };
  }
  componentDidMount() {}
  handleTab(tabIndex) {
    this.setState({
      tabIndex: tabIndex,
    });
    this.props.onTabClick(tabIndex);
  }
  onClickDiary(item) {
    this.props.onClickDiary(item);
  }
  onClickFavor(item, e) {
    this.props.onClickFavor(item, e);
  }
  render() {
    const style = {
      tabsContainer: {},
      tabList: {
        width: '100%',
        height: '44px',
        display: 'flex',
        backgroundColor: '#fff',
      },
      tabSelf: {
        flex: 1,
        fontSize: '16px',
        lineHeight: '44px',
        textAlign: 'center',
        position: 'relative',
      },
      tabSelfAactive: {
        color: '#108ee9',
      },
      tabPanel: {
        height: '100%',
        boxSizing: 'border-box',
        padding: '90px 0 0 0',
      },
      tabBox: {
        marginTop: '1rem',
      },
      empty:{
        position: 'fixed',
        left:'50%',
        top: '50%',
        transform: 'translate(-50%,-50%)'
      }
    };
    return (
      <div className="tabs-container">
        <div className="tab-list" style={style.tabList}>
          {this.state.tabList.map((tab, index) => {
            return (
              <div
                className={`tab-self ${
                  index === this.state.tabIndex ? 'active' : ''
                }`}
                key={index}
                onClick={this.handleTab.bind(this, index)}
                style={style.tabSelf}
              >
                <span>{tab.title}</span>
                <span
                  className={`bottom-line ${
                    index === this.state.tabIndex ? 'active' : ''
                  }`}
                ></span>
              </div>
            );
          })}
        </div>
        <div className="tab-panel" >
        { this.props.data.allDiarys.length === 0 ?   <div style={style.empty}><NoData></NoData> </div>: ''}
       
          
          <PullToRefresh
            damping={60}
            direction="down"
            refreshing={this.props.refreshing}
            style={{
              height: this.props.tabHeight,
              overflow: 'auto',
            }}
            onRefresh={() => {
              this.props.onTabRefresh(this.state.tabIndex);
            }}
          >
            <div className="tab-content">
              {this.state.tabIndex === 0 ? (
                <div style={style.tabBox}>
                  <RList
                    list={this.props.data.allDiarys}
                    onClickDiary={this.onClickDiary.bind(this)}
                    onClickFavor={this.onClickFavor.bind(this)}
                  ></RList>
                </div>
              ) : (
                <div style={style.tabBox}>
                  {this.props.data.myDiarys.length ? (
                    <RList
                      list={this.props.data.myDiarys}
                      onClickDiary={this.onClickDiary.bind(this)}
                      onClickFavor={this.onClickFavor.bind(this)}
                    ></RList>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </div>
          </PullToRefresh>
     
        </div>
      </div>
    );
  }
}

export default Tabs;
