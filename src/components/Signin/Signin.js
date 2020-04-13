import React from 'react';
import { withRouter } from "react-router";
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmitSignIn = (user) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: user === 'guest' ? 'guest@gmail.com' : this.state.signInEmail,
        password: user === 'guest' ? 'guest' : this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
 
        if (data && data.success === "true") {
          this.saveAuthTokenInSessions(data.token);
          this.props.loadUserAndSignIn(data.user);
          this.props.history.push("/");
        }
      })
      .catch(console.log)
  }

  render() {
    const { history } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="">
                <input
                  onClick={() => this.onSubmitSignIn('user') }
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
            </fieldset>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <div className="">
                <input
                  onClick={() => this.onSubmitSignIn('guest') }
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Guest Login"
                />
              </div>
              <div className="">
                <input
                  onClick={() => history.push('/register')}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                />
              </div>            
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default withRouter(Signin);