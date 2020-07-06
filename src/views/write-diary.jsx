import React from 'react';
import axios from '../utils/request';
import { TextareaItem, Toast } from 'antd-mobile';

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
      background: '#53a6db',
    },
    cancel: {
      color: '#0e80d2',
    },
  };

  return (
    <div style={style.wrap}>
      <span onClick={props.onClickCancel} style={style.cancel}>
        取消
      </span>
      <span onClick={props.onClickConfirm}>发布</span>
    </div>
  );
}
class WriteDiary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  componentDidMount() {
    this.autoFocusInst.focus();
    if (!this.props.location.state) {
      return;
    }
    const { content, uid, id } = this.props.location.state.diaryDetail;
    this.setState({
      uid,
      id,
      content,
    });
  }

  async onClickConfirm() {
    const { content, id, uid } = this.state;
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (id) {
      await axios.put('/diary/', {
        uid,
        id,
        content,
      });
      Toast.success('编辑成功', 1.5, (_) => {
        this.props.history.goBack();
      });
    } else {
      await axios.post('/diary/', {
        id: user.id,
        content,
      });
      Toast.success('发布成功', 1.5, (_) => {
        this.props.history.goBack();
      });
    }
  }
  onChange(value) {
    this.setState({
      content: value,
    });
  }
  onClickCancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <Header
          onClickCancel={this.onClickCancel.bind(this)}
          onClickConfirm={this.onClickConfirm.bind(this)}
        ></Header>
        <TextareaItem
          rows="16"
          value={this.state.content}
          placeholder="从前车马很慢书信很远一生只够爱一个人"
          ref={(el) => (this.autoFocusInst = el)}
          count="1000"
          style={{ minHeight: '300px', lineHeight: '18px' }}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

export default WriteDiary;
