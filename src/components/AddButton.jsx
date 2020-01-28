import React from 'react'
import upload from '../images/upload.png'

class Header extends React.Component {
  render() {
    const stylAddButton = {
      wrap: {
        width: '3rem',
        height: '3rem',
        borderRadius: '100%',
        boxShadow: 'rgba(0, 0, 0,0.2) 0 0.1rem 0.3rem 0.2rem',
        fontSize: '1rem',
        color: '#000',
        display: ''
      },
      image: {
        marginLeft: '10%',
        marginTop: '10%'
      }
    }

    return (
      <div style={stylAddButton.wrap} onClick={this.props.onClickButton}>
        <img src={upload} width="80%" style={stylAddButton.image} />
      </div>
    )
  }
}

export default Header
