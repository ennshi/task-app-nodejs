const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {newUser, newUserId, setupDB, taskOne, new2User} = require('./fixtures/db');

beforeEach(setupDB);

test('Should create task for a user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${newUser.tokens[0].token}`)
        .send({
            description: "Do it"
        })
        .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Should return all tasks of the user', async () => {
   const response = await request(app)
       .get('/tasks')
       .set('Authorization', `Bearer ${newUser.tokens[0].token}`)
       .send()
       .expect(200);
   expect(response.body.length).toEqual(2);
});

test('Should not delete task of another user', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${new2User.tokens[0].token}`)
        .send()
        .expect(404);
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});
