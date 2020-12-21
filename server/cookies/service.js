const cookieSession = require('cookie-session');

module.exports = (app) => {
  app.use(
    cookieSession({
      name: 'passport-session',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ['secretKey'], // store it btw
    })
  );
};
