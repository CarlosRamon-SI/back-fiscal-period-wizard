const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const jsonRoutes = require('./routes/jsonRoutes');
const proxyRoutes = require('./routes/proxyRoutes');
const port = 3004;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(express.json());
app.use(jsonRoutes);
app.use(proxyRoutes);
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});