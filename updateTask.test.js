const updTask = require('../../controller/updateTask.js');

describe('updTask function', () => {
    it('should update the task', () => {
        const updatedTaskName = 'Todo 1';
        const todoId = 1;
        
        const req = {
            params: { id: todoId },
            body: { taskName: updatedTaskName }
        };
        const res = {
            json: jest.fn()
        };

        updTask(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ taskName: updatedTaskName }));
    });

    it('should return a 404 status when task does not exist', () => {
        const todoList = [
            { id: 1, taskName: 'Task 1' },
            { id: 2, taskName: 'Task 2' }
        ];
        const updatedTaskName = 'Updated Task 1';
        const todoId = 7; 
        
        const req = {
            params: { id: todoId },
            body: { taskName: updatedTaskName }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        updTask(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Todo not found' });
    });
});
