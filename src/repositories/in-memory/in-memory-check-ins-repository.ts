import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInsRepositoryInterface } from '@/repositories/check-ins-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepositoryInterface {
  public items: CheckIn[] = []

  async findUserIdOnDate(userId: string, date: Date) {
    const startOfTheDate = dayjs(date).startOf('date')
    const endOfTheDate = dayjs(date).endOf('date')

    const checkIn = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const checkInOnSameDate =
        checkInDate.isAfter(startOfTheDate) &&
        checkInDate.isBefore(endOfTheDate)

      return checkIn.user_id === userId && checkInOnSameDate
    })

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
