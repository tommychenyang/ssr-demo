import fs from 'fs';
import path from 'path';
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const assets = JSON.parse(fs.readFileSync(path.resolve(BUILD_DIR, 'asset-manifest.json'), 'utf-8'));
const generateJS = (assets) => {

    return assets.entryJs.map(a => `<script src="${a}"></script>`);
}
const generateCss = (assets) => {
    return assets.entryCss.map(a => `<link href="${a}" rel="stylesheet">`);
}
const buildPage = (html) => {
    return `<!doctype html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8" />
        
        <title>React App</title>
        ${generateCss(assets)}
    </head>
    
    <body><noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${html}</div>
        ${generateJS(assets)}
    </body>
    
    </html>`
}
export { buildPage }