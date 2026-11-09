import { PeerServer } from 'peer';

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || '0.0.0.0';
// ⚠️ Do NOT use 'PATH' — it collides with the Windows system PATH variable.
const WS_PATH = process.env.PEER_PATH || '/peerjs';

const peerServer = PeerServer({
    port: PORT,
    host: HOST,
    path: WS_PATH,
    allow_discovery: true,
    proxied: false,
    concurrent_limit: 5000,
    alive_timeout: 60000,
    key: 'peerjs',
    debug: true,
});

peerServer.on('connection', (client) => {
    console.log(`[+] Peer connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
    console.log(`[-] Peer disconnected: ${client.getId()}`);
});

console.log('');
console.log('╔══════════════════════════════════════════════════╗');
console.log('║   ELVEN WANDERER — SIGNALING SERVER              ║');
console.log('╠══════════════════════════════════════════════════╣');
console.log(`║  Listening on:  ws://${HOST}:${PORT}${WS_PATH}`);
console.log(`║  Health check:  http://${HOST}:${PORT}${WS_PATH}/health`);
console.log('║  Press Ctrl+C to stop                            ║');
console.log('╚══════════════════════════════════════════════════╝');
console.log('');