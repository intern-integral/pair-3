import axios from 'axios';
import TodoServices from './TodoServices';

const { fetchAll } = TodoServices;
jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('TodoServices', () => {
  describe('#fetchAll', () => {
    it('should fetch all data when called', async () => {
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
    });

    it('should fetch all data when called using mock', async () => {
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
    });
  });
});
