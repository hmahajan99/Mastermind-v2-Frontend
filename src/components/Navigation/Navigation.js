import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class NavIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { onRouteChange, isSignedIn, toggleModal } = this.props
    if(!isSignedIn){
      return (
        <div className="pa4 tc">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle
                  tag="span"
                  onClick={this.toggle}
                  data-toggle="dropdown"
                  aria-expanded={this.state.dropdownOpen}
                >
                  <img
                    src="http://tachyons.io/img/logo.jpg"
                    className="br-100 h3 w3 dib" alt="avatar" />
                </DropdownToggle>
                <DropdownMenu className='b--transparent shadow-5' style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} right>
                  <DropdownItem onClick={() => onRouteChange('signin')}>Sign In</DropdownItem>
                  <DropdownItem onClick={() => onRouteChange('register')}>Register</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem >
                    <a href="https://github.com/hmahajan99" target="_blank" rel="noopener noreferrer" >GitHub</a>
                  </DropdownItem>
                  <DropdownItem >
                    <a href="https://www.linkedin.com/in/hmahajan99" target="_blank" rel="noopener noreferrer" >LinkedIn</a>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
        </div>
      );
    }else{
      return (
        <div className="pa4 tc">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle
                  tag="span"
                  onClick={this.toggle}
                  data-toggle="dropdown"
                  aria-expanded={this.state.dropdownOpen}
                >
                  <img
                    src="http://tachyons.io/img/logo.jpg"
                    className="br-100 h3 w3 dib" alt="avatar" />
                </DropdownToggle>
                <DropdownMenu className='b--transparent shadow-5' style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}} right>
                  <DropdownItem onClick={() => onRouteChange('home')}>Home</DropdownItem>
                  <DropdownItem onClick={() => onRouteChange('leaderboard')}>Leaderboard</DropdownItem>
                  <DropdownItem onClick={() => toggleModal()}>View Profile</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem onClick={() => onRouteChange('account')}>Settings</DropdownItem>
                  <DropdownItem onClick={() => onRouteChange('signout')}>Sign Out</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem >
                    <a href="https://github.com/hmahajan99" target="_blank" rel="noopener noreferrer" >GitHub</a>
                  </DropdownItem>
                  <DropdownItem >
                    <a href="https://www.linkedin.com/in/hmahajan99" target="_blank" rel="noopener noreferrer" >LinkedIn</a>
                  </DropdownItem>                
                </DropdownMenu>
              </Dropdown>
        </div>
      );
    }
  }
}

export default NavIcon;