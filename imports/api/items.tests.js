/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Items } from './items.js';

if (Meteor.isServer) {
  describe('Items', () => {
    describe('methods', () => {
      const userId = Random.id();
      let itemId;

      beforeEach( () => {
        Items.remove({});
        itemId = Items.insert( {
          name: 'Test name',
          amount: '100',
          price: '50',
          store: 'Test store',
          owner: userId,
          username: 'Test username',
        });
      });

      it('can delete owned item', () => {
        const deleteItem = Meteor.server.method_handlers['items.remove'];
        const invocation = { userId };

        deleteItem.apply(invocation, [itemId]);

        assert.equal(Items.find().count(), 0);
      });

      it('can check owned item', () => {
        const checkItem = Meteor.server.method_handlers['items.setChecked'];
        const invocation = { userId };

        checkItem.apply(invocation, [itemId]);

        assert.equal(Items.find().count(), 1);
      });
    });
  });
}
