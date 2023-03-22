import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import teams from './mocks/teams';
import TeamService from '../services/TeamService';
import ITeam from '../interfaces/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o Team Services', () => {
  describe('Testa o método GetAll', () => {
    afterEach(()=>{
      sinon.restore();
    });

    it('Deve retornar um array de times', async () => {
      sinon.stub(Team, 'findAll').resolves((teams as Team[]));

      const listOfTeams = await TeamService.GetAll();

      expect(listOfTeams).to.be.deep.equal(teams);
    });
  });

  describe( 'Testa o método GetById', () => {
    afterEach(()=>{
      sinon.restore();
    });

    it('Deve retornar um time', async () => {
      sinon.stub(Team, 'findByPk').resolves((teams[0] as Team));

      const team = await TeamService.GetById(1);

      expect(team as ITeam).to.be.deep.equal(teams[0] as ITeam);
    });
  });
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
