/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
// const { Reader } = require('../src/models');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'Jurassic Park',
          author: 'Michael Chrichton',
          genre: 'Science Fiction',
          isbn: '0099282917',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('Jurassic Park');
        expect(newBookRecord.title).to.equal('Jurassic Park');
        expect(newBookRecord.author).to.equal('Michael Chrichton');
        expect(newBookRecord.genre).to.equal('Science Fiction');
        expect(newBookRecord.isbn).to.equal('0099282917');
      });
    });
  });

  describe('with records in the database', () => {
    let book;

    beforeEach(async () => {
      await book.destroy({ where: {} });

      book = await Promise.all([
        Book.create({
          title: 'Jurassic Park',
          author: 'Michael Chrichton',
          genre: 'Science Fiction',
          isbn: '0099282917',
        }),
        Book.create({ title: 'Horus Rising', author: 'Dan Abnett', genre: 'Space Operas', isbn: '1789992176' }),
        Book.create({ title: 'False Gods', author: 'Graham McNeill', genre: 'Science Fiction Space Operas', isbn: '1849707464' }),
      ]);
    });

    describe('GET /books', () => {
      it('gets all book records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = book.find((a) => a.id === book.id);

          expect(book.tile).to.equal(expected.tile);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.isbn).to.equal(expected.isbn);
        });
      });
    });

    describe('GET /books/:id', () => {
      xit('gets books record by id', async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.isbn).to.equal(book.isbn);
      });

      xit('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('PATCH /books/:id', () => {
      xit('updates books genre by id', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ genre: 'Fantasy' });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.email).to.equal('Fantasy');
      });

      xit('returns a 404 if the book does not exist', async () => {
        const response = await request(app)
          .patch('/books/12345')
          .send({ genre: 'some_new_genre' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('DELETE /books/:id', () => {
      xit('deletes rbook record by id', async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      xit('returns a 404 if the book does not exist', async () => {
        const response = await request(app).delete('/books/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
  });
});