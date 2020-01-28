import React from 'react'

class List extends React.Component {
  render() {
    const itemStyl = {
      wrap: {
        width: '100%',
        padding: '0 0.5rem',
        boxSizing: 'border-box'
      },
      item: {
        borderRadius: '0.3rem',
        boxShadow: 'rgba(0, 0, 0,0.2) 0 0.1rem 0.3rem 0.2rem',
        padding: '0.5rem',
        background: '#ad8dc6',
        color: '#fff',
        marginBottom: '0.8rem'
      },
      title: {
        fontSize: '1.4rem',
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
      }
    }
    return (
      <div style={itemStyl.wrap}>
        <div style={itemStyl.item}>
          <div style={itemStyl.title}>Title</div>
          <div style={itemStyl.content}>这是内容</div>
          <div style={itemStyl.favor}>2018年08月12号</div>
        </div>
        <div style={itemStyl.item}>
          <div style={itemStyl.title}>Title</div>
          <div style={itemStyl.content}>这是内容</div>
          <div style={itemStyl.favor}>2018年08月12号</div>
        </div>
      </div>
    )
  }
}

export default List
