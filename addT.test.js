
const addNewTask = require('../../controller/addTask.js');

describe('addNewTask function', () => {
    it('should add a new task when task does not exist', () => {
        const req = {
            body: {
                id: 1,
                taskName: 'New Task',
                completed: false
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        };

        addNewTask(req, res);

       
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(expect.any(Array)); 
    });

    it('should return a 400 status when task already exists', () => {
        const req = {
            body: {
                id: 2,
                taskName: 'Todo 1', 
                completed: false
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        };

        addNewTask(req, res);

        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ mess: "task already exists" });
    });
});