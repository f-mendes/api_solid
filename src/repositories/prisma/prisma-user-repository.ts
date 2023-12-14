import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UserRepositoryInterface } from '../user-repository'

export class PrismaUserRepository implements UserRepositoryInterface {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
