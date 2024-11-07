import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';

test('vacuous test', () => {
	render(<BrowserRouter><React.StrictMode><App/></React.StrictMode></BrowserRouter>);
	const notInDocument = screen.queryByText("$!#@)");
	expect(notInDocument).toBeNull();
});

