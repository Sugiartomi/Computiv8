const { Category, Product, Profile, User } = require('../models')
const bcryptjs = require('bcrypt')


class userController {
    static registerForm(req, res) {
        res.render('register')
    }
    static postRegister(req, res) {
        const { firstName, lastName, dateOfBirth, education, email, password, role } = req.body
        // res.send(req.body)
        // console.log(req.body);
        User.create({ email, password, role })
            .then((newUser) => {
                Profile.create({ firstName, lastName, dateOfBirth, education, UserId: newUser.id })
                    .then((result) => {
                        res.redirect('/login')
                    })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static loginUser(req, res) {
        const { error } = req.query
        res.render('login', { error })
    }
    static postLogin(req, res) {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                console.log(user);
                if (user) {
                    const isValidPassword = bcryptjs.compareSync(password, user.password)
                    if (isValidPassword) {
                        req.session.userId = user.id
                        req.session.role = user.role
                        return res.redirect(`/${user.role}`)
                    } else {
                        const error = `invalid username`;
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = `invalid email`
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }
    static getLogOut(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }
}

module.exports = userController