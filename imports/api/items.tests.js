/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';

import { Items } from './items.js';

if (Meteor.isServer) {
  describe('Items', () => {
    describe('methods', () => {
      const userId = Random.id();
      let itemId, invocation;

      beforeEach( () => {
        invocation = { userId };
        StubCollections.stub(Items);
        itemId = Items.insert( {
          name: 'Test name',
          amount: '100',
          price: '50',
          store: 'Test store',
          owner: userId,
          username: 'Test username',
          private: true,
        });
      });

      describe('insert', () => {
        let insertItem;
        beforeEach( () => {
          Items.remove({});
          insertItem = Meteor.server.method_handlers['items.insert'];
        });

        it('can insert if authorized', () => {
          insertItem.apply(invocation, ['name', '1', '1', 'store']);

          assert.equal(Items.find().count(), 1);
        });

        it('cannot insert if not authorized', () => {
          const wrongUser = { null };

          expect(function() {
            insertItem.apply(wrongUser, ['name', '1', '1', 'store']);
          }).to.throw('not-authorized');

          assert.equal(Items.find().count(), 0);
        });
      });

      describe('delete', () => {
        let deleteItem;
        beforeEach( () => {
          deleteItem = Meteor.server.method_handlers['items.remove'];
        });
        it('can delete if owner', () => {
          deleteItem.apply(invocation, [itemId]);

          assert.equal(Items.find().count(), 0);
        });

        it('cannot delete if not owner', () => {
          const wrongUser = { null }

          expect(function() {
            deleteItem.apply(wrongUser, [itemId]);
          }).to.throw('not-authorized');

          assert.equal(Items.find().count(), 1);
        });
      });

      describe('check', () => {
        let checkItem;
        beforeEach( () => {
          checkItem = Meteor.server.method_handlers['items.setChecked'];
        })
        it('can check if owner', () => {
          checkItem.apply(invocation, [itemId, true]);

          assert.equal(Items.find({ checked: true }).count(), 1);
        });

        it('cannot check if not owner and private', () => {
          const wrongUser = { null }

          expect(function() {
            checkItem.apply(wrongUser, [itemId,true]);
          }).to.throw('not-authorized');

          assert.equal(Items.find({ checked: true }).count(), 0);
        });
      });

      describe('private status', () => {
        let setPrivate;
        beforeEach( () => {
          setPrivate = Meteor.server.method_handlers['items.setPrivate'];
        })
        it('can change status if owner', () => {
          setPrivate.apply(invocation, [itemId, false]);

          assert.equal(Items.find({ private: false }).count(), 1);
        });

        it('cannot change status if not owner', () => {
          const wrongUser = { null }

          expect(function() {
            setPrivate.apply(wrongUser, [itemId, false]);
          }).to.throw('not-authorized');

          assert.equal(Items.find({ private: true }).count(), 1);
        });
      });
    });
  });
}
