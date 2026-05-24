import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// --- CORS ---
const allowedOrigin = "https://ai-resume-builder-git-main-shivatejas-projects-f629e9b9.vercel.app";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options('/{*splat}', cors());

// --- Middleware ---
app.use(express.json({ limit: '10mb' }));

// --- Routes ---
app.use('/api', routes);

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// --- Error Handling ---
app.use(notFoundHandler);
app.use(errorHandler);

export default app;