import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFound } from './errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get a user by id', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Jhon Doe')
  })

  it('should not be able to get a user with id wrong', async () => {
    expect(async () => {
      await sut.execute({
        userId: 'id-user-not-exists',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
