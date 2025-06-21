import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { setupSocket } from './socket.js';
import disasterRoutes from './routes/disasterRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import socialMediaRoutes from './routes/socialMediaRoutes.js';
import updateRoutes from './routes/updateRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import { logger } from './middleware/logger.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import auth from './middleware/auth.js';

const app = express();
const server = createServer(app);
setupSocket(server);

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(logger);
app.use(auth);

app.use('/disasters', disasterRoutes);
app.use('/resources', resourceRoutes);
app.use('/disasters', socialMediaRoutes);
app.use('/disasters', updateRoutes);
app.use('/disasters', verificationRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
