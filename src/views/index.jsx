import React from 'react';
import axios from '../utils/request';
import Header from '../components/Header';
import AddButton from '../components/AddButton';
// import NoData from "../components/NoData";
import RTabs from '../components/Tsbs';
import Loading from '../components/Loading';
import '../styles/register.css';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      allDiarys: [],
      myDiarys: [],
      visible: true,
      selected: '',
      tabIndex: 0,
      showLoading: 0,
    };
  }
  componentDidMount() {
    this._getAllDiarys();
    // 顶部的标题和tab高度为90px
    this.setState({
      tabHeight: document.body.clientHeight - 90,
    });
  }
  onClickButton() {
    this.props.history.push('/writeDiary');
  }

  async _getMyDiarys() {
    this.setState({
      showLoading: 1,
      myDiarys:[]
    });
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      this.setState({
        showLoading: 0,
        refreshing: false,
      });
      this.props.history.push('/login');
      return;
    }

    try {
      const res = await axios.get('diary/myDiary', {
        params: {
          id: user.id,
          start: 0,
          count: 10,
        },
      });
  
      this.setState({
        showLoading: 0,
        myDiarys: res.data,
        refreshing: false,
      });
    } catch (error) {
      this.setState({
        showLoading:0
      })
    }
  }
  onClickDiary(item) {
    this.props.history.push(`diaryDetail/${item.id}`);
  }
  onClickFavor(item, e) {
    e.stopPropagation();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const { id } = item;
    this._favor(id, user.id);
  }
  onTabClick(index) {
    // if (!this.isDidMyDiary && index === 1) {
    //   this._getMyDiarys();
    //   this.isDidMyDiary = true;
    // }
    // console.log(index);
    if(index === 0){
      this._getAllDiarys()
    }else{
      this._getMyDiarys();
    }
    
    this.setState({
      tabIndex: index,
    });
  }
  onTabRight() {
    const storage = window.localStorage;
    storage.removeItem('user');
    this.props.history.push('/login');
  }
  onTabRefresh(index) {
    this.setState({ refreshing: true });
    if (index === 0) {
      this._getAllDiarys();
    } else {
      this._getMyDiarys();
    }
  }

  async _favor(diary_id, uid) {
    await axios.post('/favor/', {
      diary_id,
      uid,
    });
    const { allDiarys, myDiarys, tabIndex } = this.state;
    if (tabIndex === 0) {
      allDiarys.forEach((diary) => {
        if (diary.id === diary_id) {
          diary.isFavor = 1;
          diary.favor_nums = diary.favor_nums + 1;
        }
      });
    } else {
      myDiarys.forEach((diary) => {
        if (diary.id === diary_id) {
          diary.isFavor = 1;
          diary.favor_nums = diary.favor_nums + 1;
        }
      });
    }
    this.setState({
      allDiarys,
      myDiarys,
    });
  }
  async _getAllDiarys() {
    this.setState({
      showLoading: 1,
      allDiarys:[]
    });
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      this.setState({
        showLoading: 0,
        refreshing: false,
      });
      this.props.history.push('/login');
      return;
    }
    const res = await axios.get('diary', {
      params: {
        uid: user.id,
      },
    });
    this.setState({
      allDiarys: res.data,
      refreshing: false,
      showLoading: 0,
    });
  }
  render() {
    const style = {
      tabBox: {
        marginTop: '1rem',
      },
      addButton: {
        position: 'fixed',
        bottom: '5rem',
        right: '2rem',
        opacity: '0.8',
      },
      mainContent: {
        width: '100%',
        height: 'auto',
        boxSizing: 'border-box',
      },
    };
    return (
      <div className="index-container" style={{ position: 'relative' }}>
        {this.state.showLoading ? (
          <div className="loading-wrap" style={style.loadingWrap}>
            <Loading></Loading>
          </div>
        ) : (
          ''
        )}

        <div className="head-contaner">
          <Header onTabRight={this.onTabRight.bind(this)}></Header>
        </div>
        <div className="main-content" style={style.mainContent}>
          <RTabs
            onTabRefresh={this.onTabRefresh.bind(this)}
            onTabClick={this.onTabClick.bind(this)}
            onClickDiary={this.onClickDiary.bind(this)}
            onClickFavor={this.onClickFavor.bind(this)}
            data={{
              allDiarys: this.state.allDiarys,
              myDiarys: this.state.myDiarys,
              showLoading:this.state.showLoading
            }}
            refreshing={this.state.refreshing}
            tabHeight={this.state.tabHeight}
          ></RTabs>
        </div>
        <div style={style.addButton}>
          <AddButton onClickButton={this.onClickButton.bind(this)}></AddButton>
        </div>
      </div>
    );
  }
}

export default Index;
