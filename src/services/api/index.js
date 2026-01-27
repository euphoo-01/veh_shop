import { Networker } from './networker';
import { Server } from './server';

const api = new Networker();
const server = new Server(api);

export default server;
