import { User } from '@prisma/client'

export interface HttpResponse {
    status: number
    body: any
}

export interface IAuth {
    signup(data: User): Promise<HttpResponse>

    login(data: Omit<User, 'id' | 'name' | 'lastname'>): Promise<HttpResponse>
}
