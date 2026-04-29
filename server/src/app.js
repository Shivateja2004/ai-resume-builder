import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// --- CORS (strict but working) ---
const allowedOrigin = "https://ai-resume-builder-powered-six.vercel.app";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔥 IMPORTANT: handle preflight explicitly
app.options('*', cors());

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