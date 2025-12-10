import { Telegraf, Markup } from 'telegraf';
import { config } from './config.js';

const bot = new Telegraf(config.telegram.botToken);

// Команда /start - приветствие с кнопкой для открытия WebApp
bot.command('start', (ctx) => {
  const firstName = ctx.from.first_name || 'Атлет';
  
  ctx.reply(
    `👋 Привет, ${firstName}!\n\n` +
    `💪 Добро пожаловать в **Фитнес Дневник** — твой персональный помощник для тренировок!\n\n` +
    `📝 Здесь ты можешь:\n` +
    `• Вести дневник тренировок\n` +
    `• Отслеживать прогресс\n` +
    `• Получать советы от AI-коуча\n` +
    `• Находить программы тренировок\n\n` +
    `Нажми на кнопку ниже, чтобы начать! 👇`,
    {
      parse_mode: 'Markdown',
      ...Markup.keyboard([
        [Markup.button.webApp('🏋️ Открыть приложение', config.telegram.webappUrl)]
      ]).resize()
    }
  );
});

// Команда /help - помощь
bot.command('help', (ctx) => {
  ctx.reply(
    `❓ **Помощь**\n\n` +
    `/start - Начать работу с ботом\n` +
    `/help - Показать эту справку\n` +
    `/stats - Твоя статистика\n\n` +
    `Для работы с дневником тренировок используй кнопку "Открыть приложение" 👇`,
    {
      parse_mode: 'Markdown',
      ...Markup.keyboard([
        [Markup.button.webApp('🏋️ Открыть приложение', config.telegram.webappUrl)]
      ]).resize()
    }
  );
});

// Команда /stats - быстрая статистика (можно расширить)
bot.command('stats', (ctx) => {
  ctx.reply(
    `📊 **Твоя статистика**\n\n` +
    `Для просмотра подробной статистики открой приложение 👇`,
    {
      parse_mode: 'Markdown',
      ...Markup.keyboard([
        [Markup.button.webApp('🏋️ Открыть приложение', config.telegram.webappUrl)]
      ]).resize()
    }
  );
});

// Обработка текстовых сообщений
bot.on('text', (ctx) => {
  ctx.reply(
    `Я пока не умею обрабатывать текстовые сообщения 🤖\n\n` +
    `Используй кнопку ниже для работы с приложением:`,
    Markup.keyboard([
      [Markup.button.webApp('🏋️ Открыть приложение', config.telegram.webappUrl)]
    ]).resize()
  );
});

// Обработка ошибок
bot.catch((err, ctx) => {
  console.error(`❌ Error for ${ctx.updateType}:`, err);
  ctx.reply('Произошла ошибка. Попробуйте позже.');
});

// Запуск бота
async function startBot() {
  try {
    console.log('🤖 Starting Telegram bot...');
    
    // Устанавливаем команды бота
    await bot.telegram.setMyCommands([
      { command: 'start', description: 'Начать работу' },
      { command: 'help', description: 'Помощь' },
      { command: 'stats', description: 'Статистика' },
    ]);
    
    await bot.launch();
    console.log('✅ Telegram bot is running!');
    console.log(`📱 WebApp URL: ${config.telegram.webappUrl}`);
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('\n🛑 Stopping bot...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('\n🛑 Stopping bot...');
  bot.stop('SIGTERM');
});

startBot();
