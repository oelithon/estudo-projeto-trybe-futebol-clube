import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Quando o login foi feito com sucesso.', () => {

  let chaiHttpResponse: Response;

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
    
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        "email": "admin@admin.com",
        "password": "secret_admin"
      });
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('deveria retornar um objeto com informações do usuário logado', async () => {
    
    expect(chaiHttpResponse).to.be.an('object');
  })

  it('deveria retornar status 200', async () => {

    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('Quando o campo de "email" está vazio.', () => {

  let chaiHttpResponse: Response;

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
    
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        "password": "secret_admin"
      });
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('deveria retornar uma mensagem de erro', async () => {
    
    expect(chaiHttpResponse).to.be.an('object');
  });

  it('deveria retornar status 401', async () => {

    expect(chaiHttpResponse).to.have.status(401);
  });
});

describe('A requisição no endpoint .get na rota /login/validate', () => {

  let chaiHttpResponse: Response;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ3ODg4OTQ3fQ.zIM-o-edSasnGofdcDkeBI3aL4-Q3dFGcrjbZ8PXso4';

  it('deveria retornar status 200', async () => {
    chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set({ authorization: token });
    
    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('As requisições no endpoint .get na rota /login', () => {

  let chaiHttpResponse: Response;

  it('deveria retornar status 200', async () => {
    chaiHttpResponse = await chai.request(app).get('/login');
    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('As requisições no endpoint .get na rota /clubs', () => {

  let chaiHttpResponse: Response;

  it('deveria retornar status 200', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs');
    expect(chaiHttpResponse).to.have.status(200);
  });
});
