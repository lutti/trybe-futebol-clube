import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
// import TeamService from '../services/TeamService';
// import Team from '../database/models/Team';

class LoginController {
  static async TryToLogin(_req: Request, res: Response): Promise<void> {
    const tokenString = await LoginService.LoginWithJWT({
      email: 'testeee@admin.com',
      // email: 'admin@admin.com',
      password: 'secret_admin',
    });
    // res.status(200).json({ message: 'Teste OK' });
    res.status(200).json({ tokenString });
  }
}

export default LoginController;
