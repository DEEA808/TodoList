const getAll = require('../../controller/getAllTasks.js');
const getTaskById=require('../../controller/getTasksById.js');
const { todoList } = require('../../modell/todoListt.js');
describe('getFunctions function', () => {
    it('should return all tasks with status code 200 if tasks exist', () => {
        
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(), // Mocking the status method
            send: jest.fn()
        };
        
        getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(todoList);
    });
    
    // it('should return a 404 status when no tasks are found', () => {
    //     const todoList = []; // Empty todoList
        
    //     const req = {};
    //     const res = {
    //         status: jest.fn().mockReturnThis(), // Mocking the status method
    //         send: jest.fn()
    //     };

    //     getAll(req, res);

    //     expect(res.status).toHaveBeenCalledWith(404);
    //     expect(res.json).toHaveBeenCalledWith({ error: 'No tasks found' });
    // });

    it('should return the task with status code 200 if task exists', () => {
        const todoId = 1;
        
        const req = {
            params: {
                id: todoId
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        getTaskById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(todoList[0]); 
    });

    it('should return a 404 status when task is not found', () => {
        const todoId = 9; // Non-existent id
        
        const req = {
            params: {
                id: todoId
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        getTaskById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Todo item not found' });
    });
});
