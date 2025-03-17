import { User } from '@prisma/client'
import { HttpResponse, IAuth } from '../../protocols'
import { AuthService } from '../../services/authService/AuthService'

export class AuthController implements IAuth {
    constructor(private readonly authService: AuthService) {}
    async signup(data: User): Promise<HttpResponse> {
        const { status, body } = await this.authService.signup(data)

        return { status, body }
    }

    async login(
        data: Omit<User, 'id' | 'name' | 'lastname'>
    ): Promise<HttpResponse> {
        const { status, body } = await this.authService.login(data)

        return { status, body }
    }
}
