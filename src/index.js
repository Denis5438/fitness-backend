import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config.js';
import { initDatabase, closeDatabase } from './database/mock-db.js';

// Routes
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';
import aiRouter from './routes/ai.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origins,
  credentials: true,
}));
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/users', usersRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/ai', aiRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Инициализация БД и запуск сервера
async function start() {
  try {
    console.log('🔄 Initializing database...');
    initDatabase();
    
    app.listen(config.port, () => {
      console.log(`✅ Server running on http://localhost:${config.port}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🤖 AI Model: ${config.openai.model}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  closeDatabase();
  process.exit(0);
});

start();
