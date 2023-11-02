/*==================================================
src/components/debits.js

The debits component contains information for debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/

//NOTE: Bug i couldnt fix, description does NOT update unless you change value first
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import React, { Component} from 'react';

class Debits extends Component{
    constructor(){
        super();
        this.state = {
            debits: {
                id:"",
                description:"",
                amount: 0.0,
                date: ""
            },
            descriptionWorkaround:"",
        }
    }

 // Create the list of Debit items
  debitsView = () => {
    const { debits } = this.props;
    return debits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }


     // When User Name input is changed, capture the new input value and update state
      handleChange = (e) => {
        
        const updatedDebit = { ...this.state.debits };
        updatedDebit.amount = parseFloat(e.target.value).toFixed(2);
        updatedDebit.description = this.state.descriptionWorkaround; // Keep the description from the state
        updatedDebit.date = new Date().toISOString();
        updatedDebit.id = (this.state.id) + 1;
        this.setState({ debits: updatedDebit });
    }

      handleDescription = (e) => {
        this.setState({descriptionWorkaround: e.target.value})
      }
    
    // When user clicked "Log In" button, store user data and then redirect to "User Profile" page
      handleSubmit = (e) => {
        e.preventDefault()
        this.props.addDebit(this.state.debits)  // Update state in the top-level component (App.js)
      }

  render(){
    return (
        <div>
          <h1>debits</h1>
          <p>Disclaimer: Small bug where if you dont update the value BUT update the name, it will show the old name, was not able to fix</p>

          {this.debitsView()}
        
          <form onSubmit={this.handleSubmit}>
          <input type="text" name="description" onChange={this.handleDescription} />
            <input type="number" name="amount" step="0.01" onChange={this.handleChange} />
            <button type="submit">Add debits</button>
        </form>

          <AccountBalance accountBalance={this.props.accountBalance}/>
          <br/>
          <Link to="/">Return to Home</Link>
        </div>
      );
  }

}

export default Debits;