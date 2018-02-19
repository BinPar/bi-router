/* eslint no-console: "off" */
const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

const biRouter = () => {
  app.prepare().then(() => {
    createServer(handler).listen(port, (err) => {
      if (err) throw err;
      if (process.env.NODE_ENV !== 'production') {
        console.log(`> Bi-Router listening on http://localhost:${port}`);
      }
    });
  });
};

export default biRouter;
