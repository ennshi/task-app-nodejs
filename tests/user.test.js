const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user');
const {newUser, newUserId, setupDB} = require('./fixtures/db');

beforeEach(setupDB);

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: "Jane",
        email: "jane@gmail.com",
        password: "Mypasss7789"
    }).expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: "Jane",
            email: "jane@gmail.com"
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe("Mypasss7789");
});

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: newUser.email,
        password: "smthhhh"
    }).expect(400);
});

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: newUser.email,
        password: newUser.password
    }).expect(200);

    const user = await User.findById(newUserId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${newUser.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete a profile for user', async () => {
   await request(app)
       .delete('/users/me')
       .set('Authorization', `Bearer ${newUser.tokens[0].token}`)
       .send()
       .expect(200);
   const user = await User.findById(newUserId);
   expect(user).toBeNull();
});

test('Should not delete a profile for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});

test('Should upload an avatar for user', async () => {
   await request(app)
       .post('/users/me/avatar')
       .set('Authorization', `Bearer ${newUser.tokens[0].token}`)
       .attach('avatar', 'tests/fixtures/profile-pic.png')
       .expect(200);
   const user = await User.findById(newUserId);
   expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update a valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${newUser.tokens[0].token}`)
        .send({
            name: "John"
        })
        .expect(200);
    const user = await User.findById(newUserId);
    expect(user.name).toBe("John");
});

test('Should not update for non authorized user', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: "John"
        })
        .expect(401);
});

test('Should not update a non valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${newUser.tokens[0].token}`)
        .send({
            city: "Paris"
        })
        .expect(400);
});

