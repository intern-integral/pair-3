import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from './App';
import TodoServices from './services/TodoServices';

const { fetchAll } = TodoServices;

jest.mock('./services/TodoServices', () => ({
  fetchAll: jest.fn()
}));

describe('App', () => {
  describe('#render', () => {

    it('should render todos title', () => {
      const wrapper = shallow(<App />);

      const todoTitle = wrapper.find('.todo-title');

      expect(todoTitle.text()).toBe('Todo List');
    });

    it('should render todo form properly', () => {
      const wrapper = shallow(<App />);

      const todoForm = wrapper.find('TodoForm');

      expect(todoForm).toHaveLength(1);
    });

    it('should render todo list', () => {
      const wrapper = shallow(<App />);

      const todoList = wrapper.find('.todo-list');

      expect(todoList).toHaveLength(1);
    });

    it('should fetch todo list from API', async () => {
      const expectedData = [
        { _id: '6051c7bd06526d5760007b81', title: 'Hello World', description: 'Duaaar ini todo list pertama hore' },
        { _id: '6051c7ae06526d5760007b80', title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
        { _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }
      ];
      fetchAll.mockResolvedValue(expectedData);
      let wrapper;
      await act(async () => {
        wrapper = await mount(<App />);
      });
      wrapper.update();
      const todoListComponent = wrapper.find('TodoList');

      expect(todoListComponent.props().todos).toEqual(expectedData);
      expect(fetchAll).toHaveBeenCalledTimes(1);
    });

    it('should pass data as props to TodoList component', () => {
      const wrapper = shallow(<App />);

      const todoWrapper = wrapper.find('TodoList');

      expect(todoWrapper.props().todos).toHaveLength(3);
    });
  });

  describe('#handleDelete', () => {
    it('should delete todo when invoked', async () => {
      const expectedData = [
        { _id: '6051c7ae06526d5760007b80', title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
        { _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }
      ];
      const wrapper = shallow(<App />);

      const todoListComponent = wrapper.find('TodoList');
      await todoListComponent.props().handleDelete(1);
      const todoListComponentUpdated = wrapper.find('TodoList');
      const expectedTodos = todoListComponentUpdated.props().todos;

      expect(expectedTodos.length).toBe(2);
      expect(expectedTodos).toEqual(expectedData);
    });
  });

  describe('#handleAdd', () => {
    it('should add new todo when invoked', async () => {
      const wrapper = shallow(<App />);

      const todoFormComponent = wrapper.find('TodoForm');
      await todoFormComponent.props().handleAdd('banana', 'tayo the little bus');
      const todoListComponent = wrapper.find('TodoList');

      expect(todoListComponent.props().todos.length).toBe(4);
    });
  });

  describe('#handleUpdate', () => {
    it('should update todo when invoked', async () => {
      const expectedData = [
        { _id: '6051c7bd06526d5760007b81', title: 'hehe', description: 'berubah dong' },
        { _id: '6051c7ae06526d5760007b80', title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
        { _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }
      ];
      const wrapper = shallow(<App />);

      const todoFormComponent = wrapper.find('TodoForm');
      await todoFormComponent.props().handleUpdate('6051c7bd06526d5760007b81', 'hehe', 'berubah dong');
      const todoListComponent = wrapper.find('TodoList');

      expect(todoListComponent.props().todos.length).toBe(3);
      expect(todoListComponent.props().todos).toEqual(expectedData);
    });
  });

  describe('#handleEdit', () => {
    it('should invoke handleEdit function', async () => {
      const expectedData = [{ _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }];
      const wrapper = shallow(<App />);

      const todoListComponent = wrapper.find('TodoList');
      await todoListComponent.props().handleEdit(3);
      const updatedTodoFormComponent = wrapper.find('TodoForm');

      expect(updatedTodoFormComponent.props().todoData).toEqual(expectedData);
    });
  });
});
