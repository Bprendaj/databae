const router = require('express').Router();
const { User } = require('../../models'); 
const withAuth = require('../../utils/auth');


// GET ALL USERS
router.get('/', async (req, res) => {
  try {
      const userData = await User.findAll({
          attributes: { exclude: ['password'] }
        })
      res.status(200).json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// GET A SINGLE USER AND THEIR POSTS AND COMMENTS FROM ID
router.get('/:id', async (req, res) => {
  try {
      const userData = await User.findOne ({
          attributes: {exclude: ['password']},
          where: {id: req.params.id}
      })
      if (!userData) {
          res.status(404).json({message: `no user found with id: ${req.params.id}`})
          return;
        }
        res.status(200).json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// POST USER DATA TO CREATE A USER
router.post('/', async (req, res) => {
// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', gender: 'male', preference: 'female'}
try {
    const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        // gender: req.body.gender,
        // preference: req.body.preference,
        // language: req.body.language
    })
    console.log("==================");
    console.log(userData);
    console.log("==================")

    req.session.save(()=> {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;


      res.json(userData);
    })
} catch (err) {
  res.status(500).json(err);
}
});

// POST USER DATA TO LOGIN/ AUTHENTICATE
router.post('/login', async (req, res) => {
// expects {email: 'lernantino@gmail.com', password: 'password1234'}
try {
  const userData = await User.findOne({
      where: {
          email: req.body.email
        }
  });
  if(!userData){
    res.status(400).json({message:'no user with this email address found'})
    return;
  }

  const validPassword = userData.checkPassword(req.body.password);

  if (!validPassword){
      res.stataus(400).json({message:'incorrect password'})
      return;
  }

  req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      console.log('====================');
      console.log('session loggedIN:');
      console.log(req.session.loggedIn);
      console.log('====================');
  
      res.json({ user: userData, message: 'You are now logged in!' });
    });

} catch (err) {
  res.status(500).json(err);
}
});

// POST USER DATA TO LOGOUT
router.post('/logout', (req, res) => {
if (req.session.loggedIn) {
  req.session.destroy(() => {
    res.status(204).end();
  });
}
else {
  res.status(404).end();
}
});

// PUT USER DATA TO UPDATE WHAT IS PASSED THROUGH BY ID
router.put('/:id', async (req, res) => {
// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  try {
      const userData = await User.update(req.body, {
          individualHooks: true,
          where: {
              id: req.params.id
          }
      });
      if(!userData){
          res.status(404).json({message: 'no user found with this id'});
      }
      res.json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// POSTS USER DATA TO DELETE USER BY ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const userData = await User.destroy({
          where: {id: req.params.id}
      })
      if(!userData){
          res.status(404).json({message: 'no user found with this id'});
          return;
      }
      res.json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
