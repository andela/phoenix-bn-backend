import { Router } from 'express';
import passport from 'passport';
import { user } from '../../controllers';

const router = Router();

router.get('/user', (req, res, next) => {
  user.findById(req.payload.id)
    .then((users) => {
      if (!users) {
        return res.sendStatus(401);
      }
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

router.put('/user', (req, res, next) => {
  user.findById(req.payload.id)
    .then((users) => {
      if (!users) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
      if (typeof req.body.user.username !== 'undefined') {
        users.username = req.body.user.username;
      }
      if (typeof req.body.user.email !== 'undefined') {
        users.email = req.body.user.email;
      }
      if (typeof req.body.user.bio !== 'undefined') {
        users.bio = req.body.user.bio;
      }
      if (typeof req.body.user.image !== 'undefined') {
        users.image = req.body.user.image;
      }
      if (typeof req.body.user.password !== 'undefined') {
        users.setPassword(req.body.user.password);
      }
      return user.save().then(() => res.json({ user: user.toAuthJSON() })
      );
    })
    .catch(next);
});

router.post('/users/login', (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: 'can\'t be blank' } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: 'can\'t be blank' } });
  }
  passport.authenticate('local', { session: false }, (
    err,
    users,
    info
  ) => {
    if (err) {
      return next(err);
    }
    if (users) {
      return res.json({ user: user.toAuthJSON() });
    }
    return res.status(422).json(info);
  })(req, res, next);
});

router.post('/users', user.createUser);

module.exports = router;
