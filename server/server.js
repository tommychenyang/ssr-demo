const path = require('path')
const express = require('express');
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import App from '../src/App';
import { buildPage } from './renderer';
const app = express(),
    DIST_DIR = path.resolve(__dirname, '..', 'build'),
    HTML_FILE = path.join(DIST_DIR, 'index.html');

app.get('/', (req, res) => {
    res.send(buildPage(ReactDOMServer.renderToString(<App />)));
});
app.use(express.static(DIST_DIR));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})