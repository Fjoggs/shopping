import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Items = new Mongo.Collection('items');

if(Meteor.isServer) {
	Meteor.publish('items', function itemsPublication() {
		return Items.find( {
			$or: [
				{ private: { $ne: true } },
				{ owner: this.userId },
			]
		});
	});
}

Meteor.methods({
	'items.insert'(name, amount, price, store) {
		check(name, String);
		check(amount, String);
		check(price, String);
		check(store, String);

		if(!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Items.insert({
			name,
			amount,
			price,
			store,
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},
	'items.remove'(itemId) {
		check(itemId, String);

		const item = Items.findOne(itemId);
		if(item.private && item.owner!=this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Items.remove(itemId);
	},
	'items.setChecked'(itemId, setChecked) {
		check(itemId, String);
		check(setChecked, Boolean);

		const item = Items.findOne(itemId);
		if(item.private && item.owner!=this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Items.update(itemId, { $set: { checked: setChecked } });
	},
	'items.setPrivate'(itemId, setToPrivate) {
		check(itemId, String);
		check(setToPrivate, Boolean);

		const item = Items.findOne(itemId);

		if(item.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Items.update(itemId, { $set: { private: setToPrivate } });
	},
});
