import React from "react";
import { Popover, NavBar, Icon } from "antd-mobile";
const outPng = require("../images/out.png");
const Item = Popover.Item;
const myImg = (src) => (
  <img src={`${outPng}`} alt="" className="am-icon am-icon-xs" />
);
class Header extends React.Component {
  state = {
    visible: false,
    selected: "",
  };
  onSelect = (opt) => {
    console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
    if (opt.props.value === "goOut") {
      this.props.onTabRight();
    }
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render() {
    return (
      <div>
        <NavBar
          style={{ backgroundColor: "#56b783" }}
          rightContent={
            <Popover
              mask
              overlayClassName="fortest"
              overlayStyle={{ color: "currentColor" }}
              visible={this.state.visible}
              overlay={[
                <Item
                  key="4"
                  value="goOut"
                  icon={myImg("tOtXhkIWzwotgGSeptou")}
                  data-seed="logId"
                >
                  退出
                </Item>,
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div
                style={{
                  height: "100%",
                  padding: "0 15px",
                  marginRight: "-15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
        >
          吾记
        </NavBar>
      </div>
    );
  }
}

export default Header;
