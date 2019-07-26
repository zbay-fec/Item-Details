const request = require('supertest');
const app = require('../server/server.js');


describe('the /item/:id endpoint', () => {
  afterAll(async (done) => {
    setImmediate(done);
  });

  test('responds with json', () => {
    const id = String(Math.floor(Math.random() * 10000000)).padStart(8, '0');
    return request(app).get(`/item/${id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        console.log(res.body);
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('price')
        expect(res.body).toHaveProperty('image')
        expect(res.body).toHaveProperty('seller_name')
        expect(res.body).toHaveProperty('seller_score')
        expect(res.body).toHaveProperty('seller_feedback')
        expect(res.body).toHaveProperty('condition')
        expect(res.body).toHaveProperty('category')
      })
  });

  test('responds appropriately to unknown ids', () => {
    // need to get/create function to generate id
    return request(app).get(`/item/not_an_id`)
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(typeof res.body).toBe('object');
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('Can\'t find that, sorry.')
      })
  });
});

  // 'ID': String,
  // 'Name': String,
  // 'Price': String,
  // 'Image 1': String,
  // 'Image 2': String,
  // 'Image 3': String,
  // 'Image 4': String,
  // 'Image 5': String,
  // 'Seller Name': String,
  // 'Seller Score': String,
  // 'Seller Feedback': String,
  // 'Condition': String,
  // 'Category': String,
// don't intend to serve a list endpoint but, leaving this jic
// describe('Test the products list endpoint', () => {
//   afterAll(async (done) => {
//     setImmediate(done);
//   });
// 
//   test('It should respond with json', () => {
//     return request(app).get("/products")
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .then(res => {
//         expect(Array.isArray(res.body)).toBe(true);
//         expect(res.body.length).toBeGreaterThan(0)
//       })
//   });
// });