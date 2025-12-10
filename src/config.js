import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    path: process.env.DATABASE_PATH || './fitness.db',
  },
  
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.AI_MODEL || 'gpt-4o-mini',
    maxTokens: parseInt(process.env.AI_MAX_TOKENS || '500', 10),
    temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  },
  
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    webappUrl: process.env.WEBAPP_URL || 'http://localhost:5173',
  },
  
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:5173').split(','),
  },
  
  rateLimit: {
    freeTierAiRequests: parseInt(process.env.FREE_TIER_AI_REQUESTS || '10', 10),
    proTierAiRequests: parseInt(process.env.PRO_TIER_AI_REQUESTS || '-1', 10),
  },
};
