import React from 'react'
import { NavBar, Icon } from 'antd-mobile'

class Header extends React.Component {
  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          leftContent="Diary"
          rightContent={[<Icon key="1" type="ellipsis" />]}
        ></NavBar>
      </div>
    )
  }
}

export default Header
