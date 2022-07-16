import { Router } from 'express'
import { authenticate } from '../middlewares/auth.js'
import {apiDemo} from "../controllers/index.js";

const router = Router()

router.post('/api-demo', apiDemo)

export {
  router
}