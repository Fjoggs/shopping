import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
    <ul>
        <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
        <li><Link to="/main" activeClassName="active">Main</Link></li>
        <li><Link to="/prices" activeClassName="active">Prices</Link></li>
    </ul>
);
