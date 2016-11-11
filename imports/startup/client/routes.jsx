import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/App.jsx';
import { Index } from '../../ui/pages/index.jsx';
import { Main } from '../../ui/components/Main.jsx';
import { Prices } from '../../ui/components/Prices.jsx';
import { NotFound } from '../../ui/pages/404.jsx';

Meteor.startup( () => { // eslint-disable-line no-undef
	render(
      <Router history={ browserHistory }>
        <Route path="/" component={ App }>
			<IndexRoute component={ Index } />
			<Route path="/main" component={ Main } />
			<Route path="/prices" component={ Prices } />
			<Route path="*" component={ NotFound } />
		</Route>
      </Router>,
      document.getElementById( 'render-target' )
  );
});
