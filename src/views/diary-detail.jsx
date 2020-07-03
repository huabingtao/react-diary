import React from "react";
import { Modal, Toast } from "antd-mobile";
import Loading from "../components/Loading";
import axios from "../utils/request";
const alert = Modal.alert;

function Header(props) {
  const style = {
    wrap: {
      display: "flex",
      color: "#fff",
      fontSize: "1.2rem",
      height: "3rem",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 1rem",
      background: "#53a6db",
    },
    feature: {
      display: "flex",
      width: "100px",
      justifyContent: "space-between",
      alignItems: "center",
      marginRight: "-0.5rem",
    },
    icon: {
      width: "2rem",
      height: "2rem",
      padding: "0.2rem",
      color: "#fff",
    },
  };
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
  );
}

class DiaryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: "",
      id: this.props.match.params.id,
      showLoading: 0,
    };
  }
  componentDidMount() {
    this.getDiaryDetail();
  }
  async getDiaryDetail() {
    this.setState({
      showLoading: 1,
    });
    const { id } = this.state;
    const res = await axios.get(`/diary/${id}`);
    this.setState({
      detail: res.data,
      showLoading: 0,
    });
  }
  onClickDelete() {
    const { detail } = this.state;
    alert("警告⚠️", "确定要删除吗?", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确定",
        onPress: async () => {
          await axios.delete("/diary/", {
            data: {
              uid: detail.uid,
              id: detail.id,
            },
          });
          Toast.success("Delete Success", 1);
          setTimeout(() => {
            this.props.history.goBack();
          }, 500);
        },
      },
    ]);
  }
  onClickModify() {
    this.props.history.push("/writeDiary", {
      diaryDetail: this.state.detail,
    });
  }
  onClickGoback() {
    this.props.history.goBack();
  }
  render() {
    const style = {
      wrap: {
        height: "100%",
        background: "#d7ebdd",
      },
      pad: {
        padding: "0 1.2rem",
        fontSize: "1.2rem",
        lineHeight: "1.5rem",
        maxHeight: "100%",
      },
      feature: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#3e7de0",
        margin: "1.2rem 0 2rem 0",
      },
      ability: {
        display: "flex",
        marginRight: "-1.2rem",
      },
      abilityItem: {
        display: "flex",
        alignItems: "center",
        marginRight: "1rem",
      },
      abilityItemIconSvg: {
        width: "1.4rem",
        height: "1.4rem",
        padding: "0 0.5rem 0",
      },
      loadingWrap: {
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1",
      },
    };
    const detail = this.state.detail;
    return (
      <div style={style.wrap}>
        {this.state.showLoading ? (
          <div className="loading-wrap" style={style.loadingWrap}>
            <Loading></Loading>
          </div>
        ) : (
          ""
        )}

        <Header
          onClickGoback={this.onClickGoback.bind(this)}
          onClickDelete={this.onClickDelete.bind(this)}
          onClickModify={this.onClickModify.bind(this)}
        ></Header>
        {detail.id && (
          <div style={style.pad}>
            <div style={style.feature}>
              <div>{detail.create_time}</div>
              <div style={style.ability}>
                <div style={style.abilityItem}>
                  <svg
                    className="icon svg-icon"
                    style={style.abilityItemIconSvg}
                    aria-hidden="true"
                  >
                    <use href="#icon-xihuanhui" />
                  </svg>
                  <span>{detail.favor_nums}</span>
                </div>
                <div style={style.abilityItem}>
                  <svg
                    className="icon svg-icon"
                    style={style.abilityItemIconSvg}
                    aria-hidden="true"
                  >
                    <use href="#icon-eye" />
                  </svg>
                  <span>{detail.look_nums}</span>
                </div>
              </div>
            </div>
            <div>{detail.content}</div>
          </div>
        )}
      </div>
    );
  }
}

export default DiaryDetail;
