import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  describe('#render', () => {
    it('should render todos title', () => {
      const wrapper = shallow(<App />);

      const todoTitle = wrapper.find('.todo-title');

      expect(todoTitle.text()).toBe('Todo List');
    });

    it('should display todo list', () => {
      const wrapper = shallow(<App />);

      const todoList = wrapper.find('.todo-list');

      expect(todoList).toHaveLength(1);
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
        { id: 2, title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
        { id: 3, title: 'hehe iseng', description: 'mbeeeee' }
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
});
