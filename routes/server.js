const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const hostname = 'http://localhost';
const port = 5500;

const player = require('../src/server/Controllers/PlayerValorant');

async function startServerWeb(){
    app.use(express.static(path.join(__dirname, '..', 'src/public')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'src/public', 'index.html'));
    });

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
           
        });

        socket.on('accountInfo', async () => {
            const accountInfo = await player.getPlayerInfo();
            socket.emit('accountInfo', accountInfo);
        });
        socket.on('rankedInfo', async () => {
            const rankedInfo = await player.getPlayerRanked();
            socket.emit('rankedInfo', rankedInfo);
        });

        setInterval(async () => {
            const rankedInfo = await player.getPlayerRanked();
            socket.emit('rankedInfo', rankedInfo);
        }, 5 * 60 * 1000);
    });

    server.listen(port, () => {
        console.log(`Servidor en ejecución en ${hostname}:${port}`);
    });
};

module.exports = {
    startServerWeb
}