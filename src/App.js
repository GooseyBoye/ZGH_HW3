/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  } 

  addCredit = (newCredit) => {
    this.setState(prevState => ({
      creditList: [...prevState.creditList, newCredit],
      accountBalance: (parseFloat(prevState.accountBalance) + parseFloat(newCredit.amount)).toFixed(2)
    }));

  }

  addDebit = (newDebit) => {
    this.setState(prevState => ({
      debitList: [...prevState.debitList, newDebit],
      accountBalance: (parseFloat(prevState.accountBalance) - parseFloat(newDebit.amount)).toFixed(2)
    }));
  };

   componentDidMount() {
    //get credits
    fetch("https://johnnylaicode.github.io/api/credits.json")
        .then((res) => res.json())
        .then((creditData) => {

          const totalCredits = creditData.reduce((acc, credit) => acc + parseFloat(credit.amount), 0);
          const totalBalance = this.state.accountBalance + totalCredits;

            this.setState({
                creditList: creditData,
                accountBalance: totalBalance
            });
        });

      fetch("https://johnnylaicode.github.io/api/debits.json")
      .then((res) => res.json())
      .then((debitData) => {
        
        const totalDebits = debitData.reduce((acc, debit) => acc + parseFloat(debit.amount), 0);
        const totalBalance = this.state.accountBalance + totalDebits;

          this.setState({
              debitList: debitData,
              accountBalance: this.state.accountBalance - totalDebits
          });
      });
}

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} accountBalance={this.state.accountBalance} addCredit={this.addCredit}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} accountBalance={this.state.accountBalance} addDebit={this.addDebit}/>) 
    
    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/ZGH_HW3">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;