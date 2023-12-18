import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepositoryInterface {
  findById(id: string): Promise<CheckIn | null>
  findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
}
