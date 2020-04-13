import React from 'react';
import { withRouter } from "react-router";
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
    const { onSignOut, isSignedIn, toggleModal, history } = this.props
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
                  <DropdownItem onClick={() => history.push('/')}>Sign In</DropdownItem>
                  <DropdownItem onClick={() => history.push('/register')}>Register</DropdownItem>
                  <DropdownItem onClick={() => history.push('/leaderboard')}>Leaderboard</DropdownItem>
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
                  <DropdownItem onClick={() => history.push('/leaderboard')}>Leaderboard</DropdownItem>
                  <DropdownItem onClick={() => toggleModal()}>View Profile</DropdownItem>
                  <DropdownItem onClick={() => history.push('/account')}>Settings</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem onClick={() => history.push('/')}>Face Detection</DropdownItem>
                  <DropdownItem onClick={() => history.push('/celebrity')}>Celebrity</DropdownItem>
                  <DropdownItem onClick={() => history.push('/demographics')}>Demographics</DropdownItem>
                  <DropdownItem onClick={() => history.push('/concepts')}>Concepts</DropdownItem>
                  <DropdownItem onClick={() => history.push('/food')}>Food</DropdownItem>
                  <DropdownItem onClick={() => history.push('/apparels')}>Apparels</DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem onClick={() => {
                    onSignOut();
                    this.props.history.push('/');
                  }}>
                    Sign Out
                  </DropdownItem>
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

export default withRouter(NavIcon);