const router = require('express').Router();
const { User } = require('../../models')
const withAuth = require('../../utils/auth')


//signup
router.post('/', async (req, res) => {
    console.log("user route signup hits")
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        const betterUser = userData.get({plain:true});
        console.log(betterUser);

        req.session.save(() => {
            req.session.user_id = betterUser.id;
            req.session.username = betterUser.username;
            req.session.logged_in = true;
        })
    } catch (err) {
        res.status(400).json(err);
        console.log(err)
    }
})

//login
router.post('/login', async (req, res) => {
    console.log("user route login hits")
    try {
        const userData = await User.findOne({ where: {username: req.body.username}});
        
        if(!userData) {
            res.status(400).json({ message: 'Incorrect Username or Password'})
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect Username or Password'});
            return;
        }
        console.log(userData)
        console.log(validPassword)
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true; 
            
            res.json({ user: userData, message: 'You have logged in.'})
        });
    }   catch (err) {
        res.status(400).json(err);
        console.log(err)
    }
})

//logout
router.post('/logout', (req, res)=> {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    }   else {
        res.status(404).end();
    }
})


module.exports = router;