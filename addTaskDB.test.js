const request = require('supertest');
const app = require('../../server.js');

describe('GET /', () => {
  test('It should respond with status 200 and return all tasks', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test('It should respond with status 200 and return all tasks', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('DELETE /delete/:id', () => {
    test('It should respond with status 200 and delete the specified task', async () => {
      const taskId = 1; 
      const response = await request(app).delete(`/delete/${taskId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Task deleted successfully');
    });
  });
  
  describe('PUT /update/:id', () => {
    test('It should respond with status 200 and update the specified task', async () => {
      const taskId = 2; 
      const updatedTaskName = 'Updated Task Name'; 
      const response = await request(app)
        .put(`/update/${taskId}`)
        .send({ taskName: updatedTaskName });
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('rows');
      expect(response.body.rows).toHaveLength(1); // Assuming only one task is updated
      expect(response.body.rows[0].taskName).toBe(updatedTaskName);
    });
  
  });
  

