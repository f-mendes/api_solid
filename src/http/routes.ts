import { app } from '@/app'
import { authenticate } from '@/http/controllers/authenticate'
import { register } from '@/http/controllers/register'

export async function appRoutes() {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
