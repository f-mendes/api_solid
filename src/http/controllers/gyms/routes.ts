import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'
import { FastifyInstance } from 'fastify'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
