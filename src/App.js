import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Particles from 'react-particles-js';
import ImageAnalyzer from './components/ImageAnalyzer/ImageAnalyzer';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Profile from './components/Profile/Profile';
import Account from './components/Account/Account';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Modal from './components/Modal/Modal';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  isProfileOpen: false,
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: 0,
    pet: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {

    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => response.json())
            .then(user => {
              if (user && user.email) {
                this.loadUserAndSignIn(user)
              }
            })
          }
        })
        .catch(console.log)
    }
  }

  loadUserAndSignIn = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      age: data.age,
      pet: data.pet
    }})
    this.setState({isSignedIn: true})  
  }

  setUser = (user) => {
    this.setState({user: user})
  }

  onSignOut = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signout`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      }
    })  
    window.sessionStorage.removeItem('token')
    this.setState(initialState)
  }

  onDeleteAccount = () => {
    window.sessionStorage.removeItem('token')
    this.setState(initialState)
  }
  
  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }

  render() {

    const { isSignedIn, isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        {
          <div style={{display: 'flex', justifyContent: isSignedIn ? 'space-between' : 'flex-end' }} >
           { isSignedIn && <Logo />}
            <Navigation isSignedIn={isSignedIn} onSignOut={this.onSignOut} toggleModal={this.toggleModal}/>
          </div>          
        }
        {
          isProfileOpen &&
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUserAndSignIn={this.loadUserAndSignIn} />
          </Modal>
        } 

        { !isSignedIn ? (
            <Switch>
              <Route 
                exact 
                path='/register' 
                render={() => <Register loadUserAndSignIn={this.loadUserAndSignIn} /> }
              />
              <Route 
                exact 
                path='/leaderboard' 
                render={() => <Leaderboard />}
              />
              <Route 
                path='/' 
                render={() => <Signin loadUserAndSignIn={this.loadUserAndSignIn} /> }
              />
            </Switch>
          ) : (
            <Switch>
              <Route 
                exact 
                path='/leaderboard' 
                render={() => <Leaderboard />}
              />
              <Route 
                exact 
                path='/account' 
                render={() => (
                    <Account 
                      name={user.name} 
                      email={user.email} 
                      onDeleteAccount={this.onDeleteAccount} 
                    />
                )}
              />
              <Route
                path='/'
                render={() => (
                  <ImageAnalyzer 
                    user = {user}
                    setUser = {this.setUser}
                  />
                )} 
              />
            </Switch>
          )
        }

      </div>
    );
  }
}

export default App;
