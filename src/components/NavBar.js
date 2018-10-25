import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    // debugger
    if (e.target.innerText === "Logout"){
      window.location.href = "http://localhost:3000/"
    }
  }

  render() {
    const activeItem = window.location.href

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <NavLink exact to="/" componentclass='span'>
            <Menu.Item
              name='home'
              active={activeItem === 'http://localhost:3000/'}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink exact to="/profile">
            <Menu.Item
              name='profile'
              active={activeItem === 'http://localhost:3000/profile'}
              onClick={this.handleItemClick}
            />
          </NavLink>
        <NavLink exact to="/login">
          <Menu.Item
            name='login/signup'
            active={activeItem === 'http://localhost:3000/login'}
            onClick={this.handleItemClick}
          />
        </NavLink>
        <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

export default NavBar
//
// <Label as="a" image>
//   <img src="https://www.boostability.com/wp-content/uploads/2014/09/Panda-Update.jpg" />
//   Rich
// </Label>
