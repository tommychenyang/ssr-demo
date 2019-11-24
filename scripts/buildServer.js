'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const configFactory = require('../config/webpack.server.config');
const webpack = require('webpack');
const config = configFactory;
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const compile = webpack(config);
compile.run((err, stats) => {
    let messages;
    if (err) {
        if (!err.message) {
           console.log(err.message)
        }
        messages = formatWebpackMessages({
            errors: [err.message],
            warnings: [],
        });
    } else {
        messages = formatWebpackMessages(
            stats.toJson({ all: false, warnings: true, errors: true })
        );
    }
    if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
            messages.errors.length = 1;
        }
        return new Error(messages.errors.join('\n\n'));
    }
    if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
            process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
    ) {
        console.log(
            chalk.yellow(
                '\nTreating warnings as errors because process.env.CI = true.\n' +
                'Most CI servers set it automatically.\n'
            )
        );
        return new Error(messages.warnings.join('\n\n'));
    }
})