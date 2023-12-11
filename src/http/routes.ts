import { register } from '@/http/controllers/register'
import { app } from '@/app'

export async function appRoutes() {
  app.post('/users', register)
}
