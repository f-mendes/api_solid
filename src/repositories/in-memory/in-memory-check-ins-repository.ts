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
}
