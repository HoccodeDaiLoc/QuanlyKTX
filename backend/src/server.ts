import 'reflect-metadata';

import app from './app/App';

const PORT = process.env.PORT || 3000;

process.on("uncaughtException", err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
})

process.on('unhandledRejection', (err : Error) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
});

