import React from "react";
// import { Tabs, PullToRefresh } from "antd-mobile";
import "../styles/common.css";
class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      tabList: [
        {
          title: "广场",
        },
        {
          title: "我的",
        },
      ],
      tabIndex: 0,
    };
  }
  handleTab(tabIndex) {
    console.log(tabIndex);

    this.setState({
      tabIndex: tabIndex,
    });
  }
  render() {
    const style = {
      tabsContainer: {},
      tabList: {
        width: "100%",
        height: "44px",
        display: "flex",
        backgroundColor: "#fff",
        position: "sticky",
        top: "0px",
      },
      tabSelf: {
        flex: 1,
        fontSize: "16px",
        lineHeight: "44px",
        textAlign: "center",
        position: "relative",
      },
      tabSelfAactive: {
        color: "#108ee9",
      },
      tabPanel: {},
    };
    return (
      <div className="tabs-container">
        <div className="tab-list" style={style.tabList}>
          {this.state.tabList.map((tab, index) => {
            return (
              <div
                className={`tab-self ${
                  index === this.state.tabIndex ? "active" : ""
                }`}
                key={index}
                onClick={this.handleTab.bind(this, index)}
                style={style.tabSelf}
              >
                <span>{tab.title}</span>
                <span
                  className={`bottom-line ${
                    index === this.state.tabIndex ? "active" : ""
                  }`}
                ></span>
              </div>
            );
          })}
          {/* <div className={"tab-self" } style={style.tabSelf}>
            <span>广场</span>
            <span className="bottom-line"></span>
          </div>
          <div className="tab-self" style={style.tabSelf}>
            <span>我的</span>
          </div> */}
        </div>
        <div className="tab-panel">
          <div className="tab-content">
            内容
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            1111
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            内容
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            1111
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            内容
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
