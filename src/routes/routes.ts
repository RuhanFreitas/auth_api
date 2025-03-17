import { AuthRepository } from '../repositories/authRepository/AuthRepository'
import { AuthService } from '../services/authService/AuthService'
import { AuthController } from '../controllers/authController/AuthController'
import { AuthRouter } from './authRoutes'

// Auth

const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const authControler = new AuthController(authService)

export const authRouter = new AuthRouter(authControler)
