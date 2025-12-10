import { initDatabase, closeDatabase } from './db.js';

// Скрипт для инициализации БД
console.log('🔄 Initializing database...');

try {
  initDatabase();
  console.log('✅ Database initialized successfully!');
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
} finally {
  closeDatabase();
}
