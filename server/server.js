const path = require('path');
const express = require('express');
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import { buildPage } from './renderer';
import { StaticRouter } from 'react-router-dom';

const app = express(),
	DIST_DIR = path.resolve(__dirname, '..', 'build'),
	HTML_FILE = path.join(DIST_DIR, 'index.html'),
	STATIC_DIR = path.join(DIST_DIR, 'static');
    app.use('/static', express.static(STATIC_DIR));

app.get('/*', (req, res) => {
	const context = {};

	const str = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	);
	res.send(buildPage(str));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`);
	console.log('Press Ctrl+C to quit.');
});
