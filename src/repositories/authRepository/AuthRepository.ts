import { PrismaClient, User } from '@prisma/client'
import { HttpResponse, IAuth } from '../../protocols'

export class AuthRepository implements IAuth {
    private prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }

    async signup(data: User): Promise<HttpResponse> {
        try {
            const user = await this.prisma.user.create({ data })

            return { status: 201, body: user }
        } catch (error) {
            return {
                status: 500,
                body: {
                    message:
                        'Error trying to register. Please, try again letter.',
                },
            }
        }
    }

    async login(
        data: Omit<User, 'id' | 'name' | 'lastname'>
    ): Promise<HttpResponse> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: data.email },
            })

            return { status: 200, body: user }
        } catch (error) {
            return {
                status: 500,
                body: {
                    message: 'Error trying to login. Please, try again letter.',
                },
            }
        }
    }
}
