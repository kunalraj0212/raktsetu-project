import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
