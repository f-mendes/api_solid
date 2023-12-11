import { hash } from 'bcryptjs'
import { UserRepositoryInterface } from '../repositories/user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface registerServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ name, email, password }: registerServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
