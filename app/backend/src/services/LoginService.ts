import * as bcrypt from 'bcryptjs';
import CustomAppError from '../errors/CustomAppError';
import User from '../database/models/User';
import IUser from '../interfaces/IUser';
import jwt from '../utils/jwt';

class LoginService {
  static async LoginWithJWT(user: IUser): Promise<string> {
    // Fazer o Hash do password bcrypt
    // const salt = bcrypt.genSaltSync(10);
    // const encPass = bcrypt.hashSync(user.password, salt);

    // // const encPass = await bcrypt.hash(user.password, 10);
    // const passEncUser = {
    //   email: user.email,
    //   password: encPass,
    // };

    // Pegar o Usuario com o email igual
    const userFound = await User.findOne({
      where: { email: user.email },
    });

    if (!userFound) throw new CustomAppError('Invalid email or password', 401);

    // checkar se o password é igual o hash
    const compare = bcrypt.compareSync(user.password, userFound.password);

    // Retornar o Token do JWT
    const jwtToken = await jwt.generateToken({ email: user.email, password: userFound.password });
    if (compare) {
      return jwtToken;
    }

    throw new CustomAppError('Invalid email or password', 401);

    // Teste se faz mesmo hash da Seed
    // Deve ser igual a:
    // $2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW
    // return 'compare false';
  }
}

export default LoginService;
