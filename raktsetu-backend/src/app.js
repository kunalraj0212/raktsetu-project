import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import bloodRequestRoutes from './routes/bloodRequestRoutes.js';
import matchingRoutes from './routes/matchingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Middleware Imports
import { notFound, globalErrorHandler } from './middleware/errorMiddleware.js';

const app = express();

// 1. Security & Core Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// 2. API Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'RaktSetu API is running'
  });
});

// 3. API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/blood-requests', bloodRequestRoutes);
app.use('/api/v1', matchingRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// 4. 404 Route Handler
app.use(notFound);

// 5. Global Error Handler (MUST BE LAST)
app.use(globalErrorHandler);

export default app;
