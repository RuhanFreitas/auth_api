import { User } from '@prisma/client'
import 'dotenv/config'
import { HttpResponse, IAuth } from '../../protocols'
import { z } from 'zod'
import { AuthRepository } from '../../repositories/authRepository/AuthRepository'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = z.object({
    name: z.string().min(3),
    lastname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
})

const userLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export class AuthService implements IAuth {
    constructor(private readonly authRepository: AuthRepository) {}

    private hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        return hashedPassword
    }

    private validateData(data: any, type: string): any {
        if (type === 'signup') {
            const validation = userSchema.safeParse(data)

            if (!validation.success) {
                return {
                    status: 400,
                    body: {
                        message: 'Invalid data.',
                        errors: validation.error.errors,
                    },
                }
            }
        }

        if (type === 'login') {
            const validation = userLogin.safeParse(data)

            if (!validation.success) {
                return {
                    status: 400,
                    body: {
                        message: 'Invalid data.',
                        errors: validation.error.errors,
                    },
                }
            }
        }
    }

    private comparePassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword)
    }

    async signup(data: User): Promise<HttpResponse> {
        this.validateData(data, 'signup')

        const hashedPassword = this.hashPassword(data.password)

        const userData = { ...data, password: hashedPassword }

        const { status, body } = await this.authRepository.signup(userData)

        let token

        if (body.id) {
            token = jwt.sign({ id: body.id }, process.env.JWT_SECRET!, {
                expiresIn: '30d',
            })
        }

        return {
            status,
            body: {
                data: body,
                token: token,
            },
        }
    }

    async login(
        data: Omit<User, 'id' | 'name' | 'lastname'>
    ): Promise<HttpResponse> {
        this.validateData(data, 'login')

        const { status, body } = await this.authRepository.login(data)

        if (!body) {
            return {
                status,
                body,
            }
        }

        const isPasswordValid = this.comparePassword(
            data.password,
            body.password
        )

        if (!isPasswordValid) {
            return {
                status: 400,
                body: 'Incorret password.',
            }
        }

        const token = jwt.sign({ userId: body.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        })

        return {
            status,
            body: {
                data: body,
                token,
            },
        }
    }
}
