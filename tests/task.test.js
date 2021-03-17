const request = require('supertest');

const app = require('../src/app');
const Task = require('../src/models/task');
const { setupDatabase, userOne, userTwo, taskOne } = require('./fixtures/db');

beforeEach(setupDatabase);

test('should create task for user', async () => {
  const res = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'new task'
    })
    .expect(201);

  const task = await Task.findById(res.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
});

test('should fetch user tasks', async () => {
  const res = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(res.body.length).toBe(2);
});

test('should not delete other user task', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
