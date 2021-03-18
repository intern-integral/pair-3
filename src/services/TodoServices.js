import axios from 'axios';

const URI = 'http://127.0.0.1:3333/api/todos/';

class TodoServices {
  static fetchAll = async () => {
    const response = await axios.get(URI);
    return response.data.data;
  }
}

export default TodoServices;
