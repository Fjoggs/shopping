import React, { Component, PropTypes } from 'react';

import { Items } from '../api/items.js';

// Task Component - represents a single todo item
export default class Item extends Component {
  calculatePricePerKg(amount, price) {
    return  Number((price / amount) * 1000).toFixed(2);
  }

  toggleChecked() {
    Items.update(this.props.item._id, {
      $set: { checked: !this.props.item.checked },
    });
  }

  deleteThisItem() {
    Items.remove(this.props.item._id);
  }

  render() {
    const itemClassName = this.props.item.checked ? 'checked' : '';
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.amount}g</td>
        <td>{this.props.item.price}kr</td>
        <td>{this.props.item.store}</td>
        <td className="price-per-kg">{this.calculatePricePerKg(this.props.item.amount, this.props.item.price)}kr</td>
        <td>
          {React.createElement('input',
            {
              type: 'checkbox',
              checked: this.props.item.checked,
              onChange: this.toggleChecked.bind(this)
            }
          )}
        </td>
        <td>
          <button className="delete" onClick={this.deleteThisItem.bind(this)}>
            &times;
          </button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required.
  item: PropTypes.object.isRequired,
};
