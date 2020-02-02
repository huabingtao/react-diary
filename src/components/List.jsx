import React from 'react'

class List extends React.Component {
  render() {
    const itemStyl = {
      wrap: {
        width: '100%',
        padding: '0 0.8rem',
        boxSizing: 'border-box'
      },
      item: {
        borderRadius: '0.3rem',
        boxShadow: 'rgba(0, 0, 0,0.2) 0 0.1rem 0.3rem 0.2rem',
        padding: '0.8rem',
        color: '#fff',
        marginBottom: '0.8rem'
      },
      title: {
        fontSize: '1.3rem',
        padding: '0 0 0.8rem'
      },
      content: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        marginBottom: '0.8rem'
      },
      favor: {
        fontSize: '0.8rem',
        textAlign: 'right'
      },
      bgColor1: {
        background: '#b7c981'
      },
      bgColor2: {
        background: '#b2a69c'
      },
      bgColor3: {
        background: '#ad8dc6'
      },
      bgColor4: {
        background: '#bfb2a8'
      },
      bgColor5: {
        background: '#8d847e'
      },
      bgColor6: {
        background: '#a1807d'
      },
      bgColor7: {
        background: '#88d0c0'
      }
    }
    return (
      <div style={itemStyl.wrap}>
        {this.props.list.map((item, index) => {
          let itemStyle = JSON.parse(JSON.stringify(itemStyl.item))
          let integer = (index % 7) + 1
          integer = `bgColor${integer}`
          Object.assign(itemStyle, itemStyl[integer])
          return (
            <div
              style={itemStyle}
              key={item.id}
              onClick={this.props.onClickDiary.bind(this, item)}
            >
              <div style={itemStyl.title}>{item.nickname}</div>
              <div style={itemStyl.content}>{item.content}</div>
              <div style={itemStyl.favor}>{item.create_time}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default List
