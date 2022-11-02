import routes from './src/routes/index';
import express from 'express';
import {readFileSync} from 'fs';
import handlebars from 'handlebars';
import colors from 'colors';
import cors from 'cors';
import 'dotenv/config';

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './src/swagger.json';

const app = express();
app.use(express.json());
app.use(cors());

// Serve the files in /assets at the URI /assets.
app.use('/assets', express.static('assets'));

// The HTML content is produced by rendering a handlebars template.
// The template values are stored in global state for reuse.
const data = {
    service: process.env.K_SERVICE || '???',
    revision: process.env.K_REVISION || '???',
};
let template;

app.get('/', async (_req, res) => {
    // The handlebars template is stored in global state so this will only once.
    if (!template) {
        // Load Handlebars template from filesystem and compile for use.
        try {
            template = handlebars.compile(
                readFileSync('index.html.hbs', 'utf8')
            );
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal Server Error');
        }
    }

    // Apply the template to the parameters to generate an HTML string.
    try {
        const output = template(data);
        res.status(200).send(output);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});
let options = {};

app.use(
    '/swagger',
    swaggerUI.serveFiles(swaggerDocument, options),
    swaggerUI.setup(swaggerDocument)
);

app.use('/', routes);

const PORT = process.env.PORT || 8080;

let server: any = app.listen(PORT, () => {
    let port: any = server.address().PORT;
    console.log('port', port);
    console.log(
        colors.yellow.bold(
            `Hello from Cloud Run! The container started successfully and is listening for HTTP requests on ${PORT}`
        )
    );
});

process.on('unhandledRejection', (err: any) => {
    console.log(colors.red.bold(`Logged Error: ${err.message}`));
    server.close(() => process.exit(1));
});

module.exports = server;
