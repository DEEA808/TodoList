const delTask = require('../../controller/deleteTask.js');

describe('delTask function', () => {
    it('should delete the task', () => {
        const todoId=4;
        const req = {
            params: {
                id:todoId
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn() 
        };

        delTask(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.any(Array)); 
    });

    it('should return a 400 status when task does not exists', () => {
        const todoId=8;
        const req = {
            params: {
                id: todoId
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        };

        delTask(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: "Task not found" });
    });
});