import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Todos from './Todos';
import TodoServices from '../../services/TodoServices';

const {
  add,
  fetchAll,
  update
} = TodoServices;

jest.mock('../../services/TodoServices', () => ({
  fetchAll: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  fetchById: jest.fn()
}));

describe('Todos', () => {
  const mockFetchedData = [
    { _id: '6051c7bd06526d5760007b81', title: 'Hello World', description: 'Duaaar ini todo list pertama hore' },
    { _id: '6051c7ae06526d5760007b80', title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
    { _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }
  ];

  describe('#render', () => {
    it('should render todos title', () => {
      const wrapper = shallow(<Todos />);

      const todoTitle = wrapper.find('.todo-title');

      expect(todoTitle.text()).toBe('Todo List');
    });

    it('should render todo form properly', () => {
      const wrapper = shallow(<Todos />);

      const todoForm = wrapper.find('TodoForm');

      expect(todoForm).toHaveLength(1);
    });

    it('should render todo list', () => {
      const wrapper = shallow(<Todos />);

      const todoList = wrapper.find('.todo-list');

      expect(todoList).toHaveLength(1);
    });

    it('should fetch todo list from API and pass data as props to TodoList component', async () => {
      fetchAll.mockResolvedValue(mockFetchedData);
      let wrapper;
      await act(async () => {
        wrapper = await mount(<Todos />);
      });
      wrapper.update();

      const todoListComponent = wrapper.find('TodoList');

      expect(todoListComponent.props().todos).toEqual(mockFetchedData);
      expect(fetchAll).toHaveBeenCalledTimes(1);
    });
  });

  xdescribe('#handleDelete', () => {
    it('should delete todo when invoked', async () => {
      const expectedDeletedData = [
        { _id: '6051c7ae06526d5760007b80', title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
        { _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }
      ];
      const wrapper = shallow(<Todos />);

      const todoListComponent = wrapper.find('TodoList');
      await todoListComponent.props().handleDelete(1);
      const todoListComponentUpdated = wrapper.find('TodoList');
      const expectedTodos = todoListComponentUpdated.props().todos;

      expect(expectedTodos.length).toBe(2);
      expect(expectedTodos).toEqual(expectedDeletedData);
    });
  });

  describe('#handleAdd', () => {
    it('should add new todo when invoked', () => {
      const expectedTodo = {
        title: 'banana',
        description: 'tayo the little bus'
      };
      const wrapper = shallow(<Todos />);

      const todoFormComponent = wrapper.find('TodoForm');
      todoFormComponent.props().handleAdd('banana', 'tayo the little bus');

      expect(add).toHaveBeenCalledWith(expectedTodo);
    });
  });

  describe('#handleUpdate', () => {
    it('should invoke handleUpdate when called', async () => {
      const ID = '6051c7bd06526d5760007b81';
      const expectedTodo = {
        title: 'updated todo',
        description: 'this todo has been updated'
      };
      const wrapper = shallow(<Todos />);

      const todoFormComponent = wrapper.find('TodoForm');
      todoFormComponent.props().handleUpdate(ID, expectedTodo.title, expectedTodo.description);

      expect(update).toHaveBeenCalledWith(ID, expectedTodo);
    });
  });

  describe('#handleEdit', () => {
    it('should invoke handleEdit when called', async () => {
      fetchAll.mockResolvedValue(mockFetchedData);
      const expectedEditData = [{ _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }];
      let wrapper;
      await act(async () => {
        wrapper = await mount(<Todos />);
        await (new Promise((resolve) => setTimeout(resolve, 0)));
        wrapper.update();
      });

      await act(async () => {
        const todoListComponent = wrapper.find('TodoList');
        await todoListComponent.props().handleEdit('6051c79d06526d5760007b7f');
        wrapper.update();
      });
      const updatedTodoFormComponent = wrapper.find('TodoForm');

      expect(updatedTodoFormComponent.props().todoData).toEqual(expectedEditData);
    });
  });
});
