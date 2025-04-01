const request = require('supertest');
const baseUrl = 'https://petstore.swagger.io/v2';

describe('Swagger Petstore API Tests', () => {
  let petId;
  let orderId;

  //POST endpoint scenarios /pet
  it('test create a new pet', async () => {
    const response = await request(baseUrl)
      .post('/pet')
      .send({
        "id": 1,
        "category": {
          "id": 1,
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(200);
    expect(response.body.name).toBe('doggie');
  });

  it('test throw an 400 error for invalid input', async () => {
    const response = await request(baseUrl)
      .post('/pet')
      .send({
        "id": "invalidId",
        "category": {
          "id": "invalidId",
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": "invalidId",
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(405);
  });

  it('test throw an 415 error for unsupported media type', async () => {
    const response = await request(baseUrl)
      .post('/pet')
      .send()
      .expect(415);
  });

  //GET endpoint scenarios /pet/{petId}
  it('test get a pet by id', async () => {
    const response = await request(baseUrl)
      .get('/pet/1')
      .expect(200);
  });

  it('test throw an error 404, when pet not found', async () => {
    const response = await request(baseUrl)
      .get('/pet/invalidId')
      .expect(404);
  });

  it('test throw an error 405, when method not allowed', async () => {
    const response = await request(baseUrl)
      .get('/pet')
      .expect(405);
  });

  //GET endpoint scenarios /pet/{findByStatus}
  it('test get a list of sold pets', async () => {
    const response = await request(baseUrl)
      .get('/pet/findByStatus?status=sold')
      .expect(200);
  });


  it('test get an error 404, when invalid status', async () => {
    const response = await request(baseUrl)
    .get('/pet/findByStatus?status=invalidStatus')
    .expect(404);
  });

  //PUT endpoint scenarios /pet
  it('should update created pet', async () => {
    const response = await request(baseUrl)
      .put('/pet')
      .send({
        "id": 1,
        "category": {
          "id": 1,
          "name": "string"
        },
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(200);
  });

  it('test throw an error, when id is invalid', async () => {
    const response = await request(baseUrl)
      .put('/pet')
      .send({
        "id": "invalidId",
        "category": {
          "id": "invalidId",
          "name": "string"
        },
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": "invalidId",
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(400);
  });

  it('test throw an error 405, when url is not allowed', async () => {
    const response = await request(baseUrl)
      .put('/pet/1')
      .send({
        "id": 1,
        "category": {
          "id": 1,
          "name": "string"
        },
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(405);
  });

  //DELETE endpoint scenarios /pet/{petId}
  it('test delete a pet by id', async () => {
    const response = await request(baseUrl)
      .delete('/pet/1')
      .expect(200);
  });

  it('test throw and error 404, when pet is not found', async () => {
    const response = await request(baseUrl)
      .delete('/pet/invalidID')
      .expect(404);
  });

  it('test throw and error 405, when url is not allowed', async () => {
    const response = await request(baseUrl)
      .delete('/pet')
      .expect(405);
  });
});
