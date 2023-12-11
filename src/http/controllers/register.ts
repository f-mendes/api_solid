import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterService } from '../services/register'
import { PrismaUserRepository } from '../repositories/prisma/prisma-user-repository'
import { UserAlreadyExistsError } from '../services/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const validateBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = validateBody.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const registreService = new RegisterService(userRepository)

    await registreService.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}