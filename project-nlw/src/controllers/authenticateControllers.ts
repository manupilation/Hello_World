import { Request, Response } from 'express';
import { authenticateUserService } from '../services/authenticateService';

class authenticateUserController {
  async handle(request: Request, response: Response) {
    const service = new authenticateUserService();
    // service.execute()
  }
}

export { authenticateUserController };
