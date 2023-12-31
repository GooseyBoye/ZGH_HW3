/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/

//NOTE: Bug i couldnt fix, description does NOT update unless you change value first
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import React, { Component} from 'react';

class Credits extends Component{
    constructor(){
        super();
        this.state = {
            credits: {
                id:"",
                description:"",
                amount: 0.0,
                date: ""
            },
            descriptionWorkaround:"",
        }
    }

 // Create the list of Debit items
  creditsView = () => {
    const { credits } = this.props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }


     // When User Name input is changed, capture the new input value and update state
      handleChange = (e) => {
        
        const updatedCredit = { ...this.state.credits };
        updatedCredit.amount = parseFloat(e.target.value).toFixed(2);
        updatedCredit.description = this.state.descriptionWorkaround; // Keep the description from the state
        updatedCredit.date = new Date().toISOString();
        updatedCredit.id = (this.state.id) + 1; //didnt work? not sure, not gonna change it in case it breaks something
        this.setState({ credits: updatedCredit });
    }

      handleDescription = (e) => {
        this.setState({descriptionWorkaround: e.target.value})
      }
    
    // When user clicked "Log In" button, store user data and then redirect to "User Profile" page
      handleSubmit = (e) => {
        e.preventDefault()
        this.props.addCredit(this.state.credits)  // Update state in the top-level component (App.js)
      }

  render(){
    return (
        <div>
          <h1>Credits</h1>

          {this.creditsView()}
        
          <form onSubmit={this.handleSubmit}>
          <input type="text" name="description" onChange={this.handleDescription} />
            <input type="number" name="amount" step="0.01" onChange={this.handleChange} />
            <button type="submit">Add Credits</button>
        </form>

          <AccountBalance accountBalance={this.props.accountBalance}/>
          <br/>
          <Link to="/">Return to Home</Link>
        </div>
      );
  }

}

export default Credits;