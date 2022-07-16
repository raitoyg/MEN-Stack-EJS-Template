import { Router } from 'express'
import { registerUser, loginUser, logoutUser} from '../controllers/user.js'
import { authenticate } from '../middlewares/auth.js'

const router = Router()

router.post('/register', registerUser, function (req, res) {
    if (req.userExists) {
        res.render('register',
            {
                title: 'Register',
                userExists: req.userExists,
                popup: true
            })
    } else {
        res.render('register-success',
            {
                title: 'Register',
                popup: null
            })
    }
})
router.post('/login', loginUser, function (req, res) {
    if (!req.userExists) {
        console.log(req.userExists)
        res.render('login',
            {
                title: 'Log in',
                userExists: req.userExists,
                popup: true
            })
    } else {
        res.redirect('/')
    }
})
router.get('/login', authenticate, function (req, res) {
    res.render('login',
        {
            title: 'Log in',
            userExists: null,
            popup: true
        })
})
router.get('/register', function (req, res) {
    res.render('register',
        {
            title: 'Register',
            userExists: null,
            popup: true
        })
})

router.get('/logout', logoutUser)


export { router }