import { app } from '@/app'
import { authenticate } from '@/http/controllers/authenticate'
import { register } from '@/http/controllers/register'
import { profile } from './controllers/profile'
import { verifyJwt } from './middleware/verify-jwt'

export async function appRoutes() {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
