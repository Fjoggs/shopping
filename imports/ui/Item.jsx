import React, { Component, PropTypes } from 'react';

// Task Component - represents a single todo item
export default class Item extends Component {
  calculatePricePerKg(amount, price) {
    return price * (amount / 1000);
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.amount}g</td>
        <td>{this.props.item.price}kr</td>
        <td>{this.props.item.store}</td>
        <td>{this.calculatePricePerKg(this.props.item.amount, this.props.item.price)}kr</td>
      </tr>
    );
  }
}

Item.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required.
  item: PropTypes.object.isRequired,
};
