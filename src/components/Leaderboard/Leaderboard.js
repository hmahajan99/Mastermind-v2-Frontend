import React from 'react';
import Loader from '../Loader/Loader'
import Card from './LeaderboardCard';

class Leaderboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      topUsers: [],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    fetch(`${process.env.REACT_APP_BACKEND_URL}/leaderboard`,{
      method: 'get',
      headers: {
        'Authorization': window.sessionStorage.getItem('token')
      }
    }).then(response => response.json())
      .then(users => {this.setState({ topUsers: users})})
      .catch(err => console.log(err))
      .then(() => this.setState({loading: false}))
  }

  render() {
      const {topUsers} =  this.state;
      return (
        <div>
          <div style={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap'}}>
          {  
            topUsers.map((user,i)=>{
              return (
                <Card key={i} user={user} />
              )
            })
          }
          </div>
          {
            this.state.loading && <div className="mt3"> <Loader /> </div>
          }        
        </div>
      )
  }

}

export default Leaderboard;