import React from "react";

class List extends React.Component {
  filterContent(content) {
    if (content.length < 50) {
      return content;
    }
    return content.toString().substr(0, 65) + "...";
  }
  render() {
    const itemStyle = {
      wrap: {
        width: "100%",
        padding: "0 0.8rem",
        boxSizing: "border-box"
      },
      item: {
        borderRadius: "0.3rem",
        boxShadow: "rgba(0, 0, 0,0.2) 0 0.1rem 0.3rem 0.2rem",
        padding: "0.8rem",
        color: "#fff",
        marginBottom: "0.8rem"
      },
      title: {
        fontSize: "1.3rem",
        padding: "0 0 0.8rem",
        borderBottom: "0.05rem solid rgba(255,255,255,0.5)"
      },
      content: {
        paddingTop: "1rem",
        // height: '4.2rem',
        fontSize: "1rem",
        lineHeight: "1.5rem",
        marginBottom: "0.8rem",
        display: "flex",
        alignItems: "center"
      },
      feature: {
        fontSize: "0.8rem",
        display: "flex",
        justifyContent: "space-between"
      },
      favor: {
        display: "flex",
        alignItems: "center"
      },
      abilityItemIconSvg: {
        display: "inline-block",
        marginRight: "0.2rem",
        width: "1.4rem",
        height: "1.4rem",
        marginTop: "0.1rem"
      },
      time: {
        display: "flex",
        alignItems: "center"
      },
      bgColor1: {
        background: "#b7c981"
      },
      bgColor2: {
        background: "#b2a69c"
      },
      bgColor3: {
        background: "#ad8dc6"
      },
      bgColor4: {
        background: "#bfb2a8"
      },
      bgColor5: {
        background: "#8d847e"
      },
      bgColor6: {
        background: "#a1807d"
      },
      bgColor7: {
        background: "#88d0c0"
      }
    };
    return (
      <div style={itemStyle.wrap}>
        {this.props.list.map((item, index) => {
          let copyStyle = JSON.parse(JSON.stringify(itemStyle.item));
          let integer = (index % 7) + 1;
          integer = `bgColor${integer}`;
          Object.assign(copyStyle, itemStyle[integer]);
          return (
            <div
              style={copyStyle}
              key={item.id}
              onClick={this.props.onClickDiary.bind(this, item)}
            >
              <div style={itemStyle.title}>{item.nickname}</div>
              <div style={itemStyle.content}>
                {this.filterContent(item.content)}
              </div>
              <div style={itemStyle.feature}>
                <div style={itemStyle.favor}>
                  <div onClick={this.props.onClickFavor.bind(this, item)}>
                    <svg
                      className="icon svg-icon"
                      style={itemStyle.abilityItemIconSvg}
                      aria-hidden="true"
                    >
                      {item.isFavor === 1 ? (
                        <use href="#icon-xihuan" />
                      ) : (
                        <use href="#icon-xihuanhui" />
                      )}
                    </svg>
                  </div>
                  <span>{item.favor_nums}</span>
                </div>
                <div style={itemStyle.time}>{item.create_time}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default List;
