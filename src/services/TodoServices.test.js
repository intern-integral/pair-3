import axios from 'axios';
import TodoServices from './TodoServices';

const {
  add, fetchAll, fetchById, remove, update
} = TodoServices;
const URI = 'http://127.0.0.1:3333/api/todos/';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

describe('TodoServices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#fetchAll', () => {
    it('should fetch all data when fetchAll function called using mock', async () => {
      const expectedValue = {
        data: {
          data: [
            { _id: '6051c7bd06526d5760007b81', title: 'Hello World', description: 'Duaaar ini todo list pertama hore' },
            { _id: '6051c7ae06526d5760007b80', title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
            { _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }
          ]
        }
      };
      jest.spyOn(axios, 'get').mockReturnValue(expectedValue);

      const fetchedData = await fetchAll();

      expect(fetchedData).toEqual(expectedValue.data.data);
      expect(axios.get).toHaveBeenCalled();
    });

    it('should fetch all data when fetchAll function called using mock', async () => {
      const expectedValue = {
        data: {
          data: [
            { _id: '6051c7bd06526d5760007b81', title: 'Hello World', description: 'Duaaar ini todo list pertama hore' },
            { _id: '6051c7ae06526d5760007b80', title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
            { _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }
          ]
        }
      };
      axios.get.mockReturnValue(expectedValue);

      const fetchedData = await fetchAll();

      expect(fetchedData).toEqual(expectedValue.data.data);
      expect(axios.get).toHaveBeenCalled();
    });
  });

  describe('#add', () => {
    it('should call axios POST with correct params when add function invoked', async () => {
      const expectedValue = {
        data: [
          { _id: '6051c7bd06526d5760007b81', title: 'new todo', description: 'added from test' }
        ]
      };
      const newTodo = {
        title: 'new todo',
        description: 'added from test'
      };
      axios.post.mockReturnValue(expectedValue);

      const returnedTodo = await add(newTodo);

      expect(axios.post).toHaveBeenCalledWith(URI, newTodo);
      expect(returnedTodo).toEqual(expectedValue.data);
    });
  });

  describe('#update', () => {
    it('should call axios PATCH with correct params when update function invoked', async () => {
      const ID = '6051c7bd06526d5760007b81';
      const URIwithID = `${URI}${ID}`;
      const updatedTodo = {
        title: 'updated todo',
        description: 'this todo has been updated'
      };
      const expectedValue = {
        data: [
          { _id: ID, title: updatedTodo.title, description: updatedTodo.description }
        ]
      };
      axios.patch.mockReturnValue(expectedValue);

      const returnedTodo = await update(ID, updatedTodo);

      expect(axios.patch).toHaveBeenCalledWith(URIwithID, updatedTodo);
      expect(returnedTodo).toEqual(expectedValue.data);
    });
  });

  describe('#edit', () => {
    it('should call axios GET with correct params when update function invoked', async () => {
      const expectedValue = {
        data: [
          { _id: '6051c7bd06526d5760007b81', title: 'selected todo', description: 'this todo is selected' }
        ]
      };
      axios.get.mockReturnValue(expectedValue);
      const URIwithID = `${URI}6051c7bd06526d5760007b81`;

      const returnedTodo = await fetchById('6051c7bd06526d5760007b81');

      expect(axios.get).toHaveBeenCalledWith(URIwithID);
      expect(returnedTodo).toEqual(expectedValue.data);
    });
  });

  describe('#remove', () => {
    it('should call axios DELETE with correct params when delete function invoked', async () => {
      const expectedValue = {
        data: [
          { _id: '6051c7bd06526d5760007b81', title: 'deleted todo', description: 'this todo is deleted' }
        ]
      };
      axios.delete.mockReturnValue(expectedValue);
      const URIwithID = `${URI}6051c7bd06526d5760007b81`;

      const returnedTodo = await remove('6051c7bd06526d5760007b81');

      expect(axios.delete).toHaveBeenCalledWith(URIwithID);
      expect(returnedTodo).toEqual(expectedValue.data);
    });
  });
});
