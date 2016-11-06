import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Items } from '../api/items.js';

import Item from './Item.jsx';

// App component - represents the whole App
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const amount = ReactDOM.findDOMNode(this.refs.amountInput).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceInput).value.trim();
    const store = ReactDOM.findDOMNode(this.refs.storeInput).value.trim();


    Items.insert({
        name,
        amount,
        price,
        store,
      });

      // Clear form
      ReactDOM.findDOMNode(this.refs.nameInput).value = '';
      ReactDOM.findDOMNode(this.refs.amountInput).value = '';
      ReactDOM.findDOMNode(this.refs.priceInput).value = '';
      ReactDOM.findDOMNode(this.refs.storeInput).value = '';
  }

  renderItems() {
    return this.props.items.map((item) => (
      <Item key={item._id} item={item} />
    ))
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Shopping</h1>
        </header>

        <form className="new-item" onSubmit={ this.handleSubmit.bind(this) }>
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
        </form>



        <table>
          <tbody>
            <tr>
              <th>Navn</th>
              <th>Mengde i gram</th>
              <th>Pris</th>
              <th>Butikk</th>
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
};


export default createContainer(() => {
  return {
    items: Items.find({}).fetch(),
  };
}, App);
