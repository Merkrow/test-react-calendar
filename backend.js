const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const cors = require('koa-cors');

const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtsecret = 'key';
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');

const app = new Koa();
const router = new Router();
app.use(serve('public'));
app.use(bodyParser());
app.use(cors());

app.use(passport.initialize());
app.use(router.routes());
const server = app.listen(5000);

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017');
mongoose.connection.on('error', console.error);

const userSchema = new mongoose.Schema({
  displayName: String,
  email: {
    type: String,
    required: 'Укажите e-mail',
    unique: 'Такой e-mail уже существует'
  },
  passwordHash: String,
  salt: String,
  events: String,
}, {
  timestamps: true
});

userSchema.virtual('password')
.set(function (password) {
  this._plainPassword = password;
  if (password) {
    this.salt = crypto.randomBytes(128).toString('base64');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
  } else {
    this.salt = undefined;
    this.passwordHash = undefined;
  }
})

.get(function () {
  return this._plainPassword;
});

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

const User = mongoose.model('User', userSchema);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function (email, password, done) {
    User.findOne({email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }
      return done(null, user);
    });
  }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })
);

router.post('/user', async(ctx, next) => {
  try {
    const { displayName = '', email, password } = ctx.request.body;
    ctx.body = await User.create({ displayName, email, password, events: JSON.stringify([]) });
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post('/login', async(ctx, next) => {
  await passport.authenticate('local', function (err, user) {
    if (user == false) {
      ctx.body = "Login failed";
    } else {
      const payload = {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
      };
      const token = jwt.sign(payload, jwtsecret);

      ctx.body = {user: user.displayName, email: user.email, events: user.events, token: 'JWT ' + token};
    }
  })(ctx, next);

});

router.post('/events', async(ctx, next) => {
  const { events, email } = ctx.request.body;
  await User.update({ email: email }, { events: events });
  ctx.body = await User.findOne({ email: email });
})

router.get('/events', async(ctx, next) => {
  await passport.authenticate('jwt', function (err, user) {
    if (user) {
      ctx.body = { email: user.email, events: user.events, };
    } else {
      ctx.body = "No such user";
    }
  } )(ctx, next)
});
