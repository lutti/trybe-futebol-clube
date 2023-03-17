import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
// import TeamService from '../services/TeamService';
// import Team from '../database/models/Team';

class LoginController {
  static async TryToLogin(req: Request, res: Response): Promise<void> {
    const token = await LoginService.LoginWithJWT(req.body);
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json({ token });
  }
}

export default LoginController;
