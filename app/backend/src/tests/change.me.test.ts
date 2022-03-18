import * as sinon from 'sinon';
import * as chai from 'chai';
import bcrypt from 'bcryptjs';
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('As requisições no endpoint .post na rota /login', () => {

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        id: 1,
		    username: 'Admin',
		    role: 'admin',
		    email: 'admin@admin.com',
		    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      } as UserModel);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });
});

describe('As requisições no endpoint .get na rota /login', () => {

  it('deveria retornar status 200', async () => {
    const result = await chai.request(app).get('/login');

    expect(result).to.have.status(200);
  });
})
