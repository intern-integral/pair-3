import axios from 'axios';

const URI = 'http://127.0.0.1:3333/api/todos/';

class TodoServices {
  static add = async (todo) => {
    const response = await axios.post(URI, todo);
    return response.data;
  }

  static fetchAll = async () => {
    const response = await axios.get(URI);
    return response.data.data;
  }

  static fetchById = async (id) => {
    const response = await axios.get(URI + id);
    return response.data;
  }

  static update = async (id, todo) => {
    const response = await axios.patch(URI + id, todo);
    return response.data;
  }

  static remove = async (id) => {
    const response = await axios.delete(URI + id);
    return response.data;
  }
}

export default TodoServices;
