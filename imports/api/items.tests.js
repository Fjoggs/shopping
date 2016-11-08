/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { stubs } from 'meteor/practicalmeteor:sinon';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Items } from './items.js';

if (Meteor.isServer) {
  describe('Items collection', () => {
    describe('methods', () => {
      const userId = Random.id();
      let itemId, invocation;

      beforeEach( () => {
        invocation = { userId };
        resetDatabase();
      });

      describe('insert item', () => {
        it('can insert if authorized', () => {
          const insertItem = Meteor.server.method_handlers['items.insert'];
          stubs.create('findOne', Meteor.users, 'findOne');
          stubs.findOne.returns({ username: 'Test username'})
          insertItem.apply(invocation, ['name', '1', '1', 'store']);

          assert.equal(Items.find().count(), 1);
          stubs.restoreAll();
        });

        it('cannot insert if not authorized', () => {
          const insertItem = Meteor.server.method_handlers['items.insert'];
          const wrongUser = { null };

          expect(function() {
            insertItem.apply(wrongUser, ['name', '1', '1', 'store']);
          }).to.throw('not-authorized');

          assert.equal(Items.find().count(), 0);
        });
      });

      describe('one item inserted', () => {
        beforeEach( () => {
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

        describe('delete item', () => {
          it('can delete if owner', () => {
            const deleteItem = Meteor.server.method_handlers['items.remove'];
            deleteItem.apply(invocation, [itemId]);

            assert.equal(Items.find().count(), 0);
          });

          it('cannot delete if not owner', () => {
            const deleteItem = Meteor.server.method_handlers['items.remove'];
            const wrongUser = { null }

            expect(function() {
              deleteItem.apply(wrongUser, [itemId]);
            }).to.throw('not-authorized');

            assert.equal(Items.find().count(), 1);
          });
        });

        describe('check item', () => {
          it('can check if owner', () => {
            const checkItem = Meteor.server.method_handlers['items.setChecked'];
            checkItem.apply(invocation, [itemId, true]);

            assert.equal(Items.find({ checked: true }).count(), 1);
          });

          it('cannot check if not owner and private', () => {
            const checkItem = Meteor.server.method_handlers['items.setChecked'];
            const wrongUser = { null }

            expect(function() {
              checkItem.apply(wrongUser, [itemId,true]);
            }).to.throw('not-authorized');

            assert.equal(Items.find({ checked: true }).count(), 0);
          });
        });

        describe('private item', () => {
          it('can change status if owner', () => {
            const setPrivate = Meteor.server.method_handlers['items.setPrivate'];
            setPrivate.apply(invocation, [itemId, false]);

            assert.equal(Items.find({ private: false }).count(), 1);
          });

          it('cannot change status if not owner', () => {
            const setPrivate = Meteor.server.method_handlers['items.setPrivate'];
            const wrongUser = { null }

            expect(function() {
              setPrivate.apply(wrongUser, [itemId, false]);
            }).to.throw('not-authorized');

            assert.equal(Items.find({ private: true }).count(), 1);
          });
        });
      });
    });
  });
}
