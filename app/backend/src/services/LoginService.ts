import * as bcrypt from 'bcryptjs';
import CustomAppError from '../errors/CustomAppError';
import User from '../database/models/User';
import IUser from '../interfaces/IUser';
import jwt from '../utils/jwt';

class LoginService {
  static async LoginWithJWT(user: IUser): Promise<string> {
    // Fazer o Hash do password bcrypt
    const encPass = await bcrypt.hash(user.password, 10);
    const passEncUser = {
      email: user.email,
      password: encPass,
    };

    // Pegar o Usuario com o email igual
    const userFound = await User.findOne({
      where: { email: passEncUser.email },
    });

    if (!userFound) throw new CustomAppError('User not Found', 404);

    // checkar se o password é igual o hash
    const compare = await bcrypt.compare(userFound.password, encPass);

    // Retornar o Token do JWT
    const jwtToken = await jwt.generateToken(passEncUser);
    if (compare) {
      return jwtToken;
    }/* else {
      return 'Invalid Credentials';
    } */

    // Teste se faz mesmo hash da Seed
    // Deve ser igual a:
    // $2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW
    return JSON.stringify(encPass);
  }
}

export default LoginService;
