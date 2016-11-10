import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Prices extends Component {
	render() {
		return (
			// { this.props.currentUser ?
			// 	<form onSubmit={ this.handleSubmit.bind(this) }>
			// 		<input
			// 			type="text"
			// 			ref="nameInput"
			// 			placeholder="Navn på vare"
			// 			/>
			// 		<input
			// 			type="number"
			// 			ref="amountInput"
			// 			placeholder="Mengde i gram"
			// 			/>
			// 		<input
			// 			type="number"
			// 			ref="priceInput"
			// 			placeholder="Pris"
			// 			/>
			// 		<input
			// 			type="text"
			// 			ref="storeInput"
			// 			placeholder="Butikk"
			// 			/>
			// 		<input type="submit" value="Submit!" />
			// 	</form> : ''
			// }
			<table>
				<tbody>
					<tr>
						<th>Navn</th>
						<th>Pris</th>
						<th>Butikk</th>
						<th>Pris per kg</th>
					</tr>
					{ this.renderItems() }
				</tbody>
			</table>
		);
	}
}
