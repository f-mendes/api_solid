import { UserRepositoryInterface } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFound()
    }

    return {
      user,
    }
  }
}
