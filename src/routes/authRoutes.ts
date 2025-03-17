import { Router } from 'express'
import { AuthController } from '../controllers/authController/AuthController'

export class AuthRouter {
    public router: Router

    constructor(private authController: AuthController) {
        this.router = Router()

        this.login()
        this.signup()
        this.logout()
    }

    private login() {
        this.router.post('/login', async (req, res) => {
            try {
                const { status, body } = await this.authController.login(
                    req.body
                )

                res.cookie('token', body.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'strict',
                })

                res.status(status).send(body.data)
            } catch (error) {
                res.status(500).send('Error trying to access')
            }
        })
    }

    private signup() {
        this.router.post('/signup', async (req, res) => {
            try {
                const { status, body } = await this.authController.signup(
                    req.body
                )

                res.cookie('token', body.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'strict',
                })

                res.status(status).send(body.data)
            } catch (error) {
                res.status(500).send('Error trying to access')
            }
        })
    }

    private logout() {
        this.router.post('/logout', async (req, res) => {
            res.clearCookie('token')
            res.status(200).json({
                message: 'User disconnected successfully',
            })
        })
    }
}
