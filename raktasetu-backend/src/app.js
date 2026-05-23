import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import bloodRequestRoutes from './routes/bloodRequestRoutes.js';
import matchingRoutes from './routes/matchingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import bloodBankRoutes from './routes/bloodBankRoutes.js';

// Middleware Imports
import { notFound, globalErrorHandler } from './middleware/errorMiddleware.js';
import { authRateLimiter, apiRateLimiter } from './middleware/rateLimiter.js';

const app = express();
// 1. Security & Core Middleware
app.use(helmet());

// CORS: environment-driven origins with localhost fallbacks and Vercel preview support
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const defaultOrigins = [
      'http://localhost:5173', 
      'http://localhost:5174',
      'https://raktasetu.online',
      'https://www.raktasetu.online',
      'https://raktsetu-api-l7lm.onrender.com'
    ];
    const allowedOrigins = process.env.CORS_ORIGIN
      ? [...process.env.CORS_ORIGIN.split(',').map(o => o.trim()), ...defaultOrigins]
      : defaultOrigins;
      
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // Allow any Vercel preview deployment
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    console.warn(`[CORS Blocked] Origin not allowed: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // Parses incoming JSON payloads

// 2. API Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'RaktaSetu API is running'
  });
});

// 3. API Routes
app.use('/api/v1/auth', authRateLimiter, authRoutes);
app.use('/api/v1/blood-requests', apiRateLimiter, bloodRequestRoutes);
app.use('/api/v1', apiRateLimiter, matchingRoutes);
app.use('/api/v1/notifications', apiRateLimiter, notificationRoutes);
app.use('/api/v1/blood-banks', apiRateLimiter, bloodBankRoutes);

// 4. 404 Route Handler
app.use(notFound);

// 5. Global Error Handler (MUST BE LAST)
app.use(globalErrorHandler);

export default app;
