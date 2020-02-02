import React from 'react'

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
      background: '#53a6db'
    },
    feature: {
      display: 'flex',
      width: '100px',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: '-0.5rem'
    },
    icon: {
      width: '2rem',
      height: '2rem',
      padding: '0.2rem',
      color: '#fff'
    }
  }

  return (
    <div style={style.wrap}>
      <span onClick={props.onClickCancel}>返回</span>
      <div style={style.feature}>
        <div>
          <svg className="icon svg-icon" style={style.icon} aria-hidden="true">
            <use href="#icon-shanchu" />
          </svg>
        </div>
        <div>
          <svg className="icon svg-icon" style={style.icon} aria-hidden="true">
            <use href="#icon-bianji" />
          </svg>
        </div>
      </div>
    </div>
  )
}

class DiaryDetail extends React.Component {
  onClickCancel() {
    this.props.history.push('/index')
  }
  render() {
    const diary = this.props.location.state.item
    const style = {
      pad: {
        padding: '0 1.2rem',
        fontSize: '1.2rem',
        lineHeight: '1.5rem'
      },
      feature: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#3e7de0',
        margin: '1.2rem 0 2rem 0'
      },
      ability: {
        display: 'flex',
        marginRight: '-1.2rem'
      },
      abilityItem: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem'
      },
      abilityItemIconSvg: {
        width: '1.4rem',
        height: '1.4rem',
        padding: '0 0.5rem 0'
      }
    }

    return (
      <div>
        <Header onClickCancel={this.onClickCancel.bind(this)}></Header>
        <div style={style.pad}>
          <div style={style.feature}>
            <div>{diary.create_time}</div>
            <div style={style.ability}>
              <div style={style.abilityItem}>
                <svg
                  className="icon svg-icon"
                  style={style.abilityItemIconSvg}
                  aria-hidden="true"
                >
                  <use href="#icon-xihuanhui" />
                </svg>
                <span>4</span>
              </div>
              <div style={style.abilityItem}>
                <svg
                  className="icon svg-icon"
                  style={style.abilityItemIconSvg}
                  aria-hidden="true"
                >
                  <use href="#icon-eye" />
                </svg>
                <span>27</span>
              </div>
            </div>
          </div>
          <div>{diary.content}</div>
        </div>
      </div>
    )
  }
}

export default DiaryDetail