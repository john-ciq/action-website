
const express = require('express');
const helper = require('./helpers');

////////////////////////////////////////////////////////////////////////////////
// Constants
////////////////////////////////////////////////////////////////////////////////
// The port to listen on
const PORT_LISTEN = 3001;
// The directory were pages are stored
const DIR_PAGES = "pages";
////////////////////////////////////////////////////////////////////////////////

// Create the app
const app = express();


////////////////////////////////////////////////////////////////////////////////
// Web methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Return the specified status code. If a page exists in "pages/status-NNN.html" (where NNN is an HTTP status code),
 * then that file will be sent. Otherwise, a generic status message will be sent.
 */
app.get('/status/:code', async (req, res) => {
    const code = parseInt(req.params.code);
    // Try to find a matching status page
    const PAGE_STATUS_WITH_CODE = `${DIR_PAGES}/status-${code}.html`;
    if (await helper.canReadFileAsync(PAGE_STATUS_WITH_CODE)) {
        res.status(code).sendFile(PAGE_STATUS_WITH_CODE, { root: __dirname });
    } else {
        try {
            res.status(code).send(`Status code ${code}`);
        } catch (error) {
            // Something bad happened, probably an invalid status code; return a 501
            res.status(501).send(`Internal server error (was the intended status code valid?)`);
        }
    }
});

/**
 * Waits for a specified number of milliseconds before returning the "wait" page.
 */
app.get('/wait/:timeMS', (req, res) => {
    setTimeout(() => {
        res.sendFile(`${DIR_PAGES}/wait.html`, { root: __dirname });
    }, req.params.timeMS);
});
////////////////////////////////////////////////////////////////////////////////


// Start the server
app.listen(PORT_LISTEN, () => {
    console.log(`Server listening at http://localhost:${PORT_LISTEN}`);
});
