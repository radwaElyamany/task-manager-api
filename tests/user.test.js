const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should sign up a new user', async () => {
  const res = await request(app)
    .post('/users')
    .send({
      name: 'radwa',
      email: 'radwa@test.com',
      password: '123456'
    })
    .expect(201);

  // assert the database was changed correctly
  const user = await User.findById(res.body.user._id);
  expect(user).not.toBeNull();

  // assertions about the response
  expect(res.body.user.name).toBe('radwa');
  //or
  expect(res.body).toMatchObject({
    user: {
      name: 'radwa',
      email: 'radwa@test.com'
    },
    token: user.tokens[0].token
  });

  // assert password not saved as plain text
  expect(user.password).not.toBe('123456');
});

test('should login existing user', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(userOneId);

  expect(res.body.token).toBe(user.tokens[1].token);
});

test('should not login nonexisting user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'lolo@test.com',
      password: '123'
    })
    .expect(400);
});

test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('should delete account for user', async () => {
  const res = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('should not delete account  for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

  const user = await User.findById(userOneId);

  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: 'dano' });

  const user = await User.findById(userOneId);
  expect(user.name).toBe('dano');
});

test('should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: 'cairo' })
    .expect(400);
});
