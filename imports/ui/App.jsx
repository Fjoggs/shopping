import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Items } from '../api/items.js';

import Item from './Item.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole App
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const amount = ReactDOM.findDOMNode(this.refs.amountInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
    const store = ReactDOM.findDOMNode(this.refs.storeInput).value.trim();

    Meteor.call('items.insert', name, amount, price, store);

      // Clear form
      ReactDOM.findDOMNode(this.refs.nameInput).value = '';
      ReactDOM.findDOMNode(this.refs.amountInput).value = '';
      ReactDOM.findDOMNode(this.refs.priceInput).value = '';
      ReactDOM.findDOMNode(this.refs.storeInput).value = '';
  }

  toggleHideCompleted() {
   this.setState({
     hideCompleted: !this.state.hideCompleted,
   });
  }

  renderItems() {
    let filteredItems = this.props.items;
    if (this.state.hideCompleted) {
      filteredItems = filteredItems.filter(item => !item.checked);
    }

    return filteredItems.map((item) =>  {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = item.owner === currentUserId;
      return (
        <Item key={item._id} item={item} showPrivateButton={showPrivateButton} />
      )
    })
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Antall varer som ikke er huket av {this.props.incompleteCount}</h1>
        </header>

        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={this.state.hideCompleted}
            onChange={this.toggleHideCompleted.bind(this)}
          />
          Skjul huket av varer
        </label>

        <AccountsUIWrapper />

        { this.props.currentUser ?
          <form onSubmit={ this.handleSubmit.bind(this) }>
            <input
              type="text"
              ref="nameInput"
              placeholder="Navn på vare"
            />
            <input
              type="number"
              ref="amountInput"
              placeholder="Mengde i gram"
            />
            <input
              type="number"
              ref="priceInput"
              placeholder="Pris"
            />
            <input
              type="text"
              ref="storeInput"
              placeholder="Butikk"
            />
            <input type="submit" value="Submit!" />
          </form> : ''
        }


        <table>
          <tbody>
            <tr>
              <th>Navn</th>
              <th>Mengde i gram</th>
              <th>Pris</th>
              <th>Butikk</th>
              <th>Pris per kg</th>
              <th>Check</th>
              <th>Lagt inn av</th>
              <th>Fjern fra listen</th>
            </tr>
          { this.renderItems() }
          </tbody>
        </table>
      </div>
    );
  }
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};


export default createContainer(() => {
  Meteor.subscribe('items');
  return {
    items: Items.find({}).fetch(),
    incompleteCount: Items.find({ checked: { $ne: true} }).count(),
    currentUser: Meteor.user(),
  };
}, App);
