import React from 'react'; // eslint-disable-line no-unused-vars
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx'; // eslint-disable-line no-unused-vars

Meteor.startup(() => {
	FlowRouter.route('/', {
	  name: 'App.show',
	  action() {
		mount(App, {
		  main: <App />,
		});
	  },
	});
	// render(<App />, document.getElementById('render-target'));
});
