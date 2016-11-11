import React from 'react';
import { Navigation } from '../pages/navigation.jsx';

export const App = ( { children }) => (
    <div>
        <Navigation />
        { children }
    </div>
);
