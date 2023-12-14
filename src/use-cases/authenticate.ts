import { UserRepositoryInterface } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface UserRepositoryRequest {
  email: string
  password: string
}

interface UserRepositoryResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    password,
  }: UserRepositoryRequest): Promise<UserRepositoryResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMathes = await compare(password, user.password_hash)

    if (!doesPasswordMathes) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
