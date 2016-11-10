import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Item extends Component {
	calculatePricePerKg(amount, price) {
		return  Number((price / amount) * 1000).toFixed(2);
	}

	toggleChecked() {
		Meteor.call('items.setChecked', this.props.item._id, !this.props.item.checked);
	}

	deleteThisItem() {
		Meteor.call('items.remove', this.props.item._id);
	}

	togglePrivate() {
		Meteor.call('items.setPrivate', this.props.item._id, !this.props.item.private);
	}

	render() {
		const amount = this.props.item.amount;
		const price = this.props.item.price;
		return (
			<tr>
				<td>{this.props.item.name}</td>
				<td>{amount}g</td>
				<td>{price}kr</td>
				<td>{this.props.item.store}</td>
				<td className="price-per-kg">
					{this.calculatePricePerKg(amount, price)}kr
				</td>
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
	item: PropTypes.object.isRequired,
	showPrivateButton: React.PropTypes.bool.isRequired,
};
