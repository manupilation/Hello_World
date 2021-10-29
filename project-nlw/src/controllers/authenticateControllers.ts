import { Request, Response } from 'express';
import { authenticateUserService } from '../services/authenticateService';

class authenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body
    const service = new authenticateUserService();
    const result = await service.execute(code);

    return response.json(result);
  }
}

export { authenticateUserController };
