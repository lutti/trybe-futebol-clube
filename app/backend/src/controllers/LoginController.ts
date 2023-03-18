import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
// import TeamService from '../services/TeamService';
// import Team from '../database/models/Team';
import { CustomRequest } from '../middlewares/AuthMiddleware';

class LoginController {
  static async TryToLogin(req: Request, res: Response): Promise<void> {
    const token = await LoginService.LoginWithJWT(req.body);
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json({ token });
  }

  static async GetUserRole(req: Request, res: Response): Promise<void> {
    const customReq = req as CustomRequest;
    const role = await LoginService.GetUserRoleByEmail(customReq.user.email);
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json({ role });
  }
}

export default LoginController;
