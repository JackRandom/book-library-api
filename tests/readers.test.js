/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Reader } = require('../src/models');
const app = require('../src/app');

describe('/readers', () => {
  before(async () => Reader.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /readers', () => {
      it('creates a new reader in the database', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'testpassword',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('Elizabeth Bennet');
        expect(newReaderRecord.name).to.equal('Elizabeth Bennet');
        expect(newReaderRecord.email).to.equal('future_ms_darcy@gmail.com');
        expect(newReaderRecord.password).to.equal('testpassword');
      });

      it('it returns a 400 and does not create a new Reader if the email is missing', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Barry Beggs',
          email: 'future_mr_beggsgmail.com',
          password: '12345678',
        });


        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);

      });

      it('it returns a 400 and does not create a new Reader if the password is not a minimum of 8 characters', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Barry Beggs',
          email: 'future_mr_beggs@gmail.com',
          password: '1234567',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);

      });
    });
  });

  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      await Reader.destroy({ where: {} });

      readers = await Promise.all([
        Reader.create({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'testpassword',
        }),
        Reader.create({ name: 'Arya Stark', email: 'vmorgul@me.com', password: 'testpasswrd' }),
        Reader.create({ name: 'Lyra Belacqua', email: 'darknorth123@msn.org', password: 'testpssword' }),
      ]);
    });

    describe('GET /readers', () => {
      xit('gets all readers records', async () => {
        const response = await request(app).get('/readers');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
          expect(reader.password).to.equal(expected.password);
        });
      });
    });

    describe('GET /readers/:id', () => {
      xit('gets readers record by id', async () => {
        const reader = readers[0];
        const response = await request(app).get(`/readers/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
        expect(response.body.password).to.equal(reader.password);
      });

      xit('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).get('/readers/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('PATCH /readers/:id', () => {
      xit('updates readers email by id', async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: 'miss_e_bennet@gmail.com' });
        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal('miss_e_bennet@gmail.com');
      });

      xit('returns a 404 if the reader does not exist', async () => {
        const response = await request(app)
          .patch('/readers/12345')
          .send({ email: 'some_new_email@gmail.com' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('DELETE /readers/:id', () => {
      xit('deletes reader record by id', async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/readers/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });

      xit('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).delete('/readers/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });
  });
});