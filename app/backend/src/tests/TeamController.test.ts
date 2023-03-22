import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import teams from './mocks/teams';
import TeamService from '../services/TeamService';
import ITeam from '../interfaces/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste o controler de Team', () => {
  describe('Testa o método GetAll', () => {
    afterEach(()=>{
      sinon.restore();
    });

    it('Deve retornar um array de times', async () => {
      sinon.stub(TeamService, 'GetAll').resolves((teams as ITeam[]));

      const chaiHttpResponse: Response = await chai
      .request(app)
      .get('/teams');

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams);
      expect(chaiHttpResponse.body[0]).to.have.property('id');
      expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    });
  });

  describe('Testa o método GetById', () => {
    afterEach(()=>{
      sinon.restore();
    });

    it('Deve retornar um time com sucesso', async () => {
      sinon.stub(TeamService, 'GetById').resolves((teams[0] as ITeam));

      const chaiHttpResponse: Response = await chai
      .request(app)
      .get('/teams/1');

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams[0]);
      expect(chaiHttpResponse.body).to.have.property('id');
      expect(chaiHttpResponse.body).to.have.property('teamName');
    });

    it('Deve retornar um erro 404 id nao encontrado', async () => {
      sinon.stub(TeamService, 'GetById').resolves(null);

      const chaiHttpResponse: Response = await chai
      .request(app)
      .get('/teams/999');

      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Team not found' });
    });

    it('Deve retornar um erro 500 id nao valido', async () => {
      sinon.stub(TeamService, 'GetById').resolves(null);

      const chaiHttpResponse: Response = await chai
      .request(app)
      .get('/teams/XXX');

      expect(chaiHttpResponse.status).to.be.eq(500);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid id or not a number' });
    });
  });
});
