const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
  
  })


test('Users with invalid data are not created', async () => {
    const User = {
        username: "1",
        name: "Admin",
        password: "3"

    }
    const response = await api.post('/api/Users')
    .send(User)
    .expect(400)
    expect(response.text).toContain("error")

})


afterAll(() => {
  mongoose.connection.close()
})