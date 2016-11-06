import React, { Component, PropTypes } from 'react';

// Task Component - represents a single todo item
export default class Item extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.amount}</td>
        <td>{this.props.item.price}</td>
        <td>{this.props.item.store}</td>
      </tr>
    );
  }
}

Item.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required.
  item: PropTypes.object.isRequired,
};
