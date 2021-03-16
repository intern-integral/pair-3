import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './TodoList';

describe('TodoList', () => {
  const data = [
    { id: 1, title: 'Hello World', description: 'Duaaar ini todo list pertama hore' },
    { id: 2, title: 'Banana Potato', description: 'Lorem ipsum dolor sit amet' },
    { id: 3, title: 'Hehe Iseng', description: 'Mbeeeee' }
  ];

  describe('#render', () => {
    it('should pass data as props to TodoList component', () => {
      const wrapper = shallow(<TodoList todos={data} />);

      const todoItem = wrapper.find('.todo-item');

      expect(todoItem).toHaveLength(3);
    });

    it('should render delete button', () => {
      const wrapper = shallow(<TodoList todos={data} />);

      const deleteBtn = wrapper.find('.delete-btn');

      expect(deleteBtn).toHaveLength(3);
    });
  });

  describe('#handleAdd', () => {
    it('should delete todo item when delete button clicked', () => {
      const mockHandleDelete = jest.fn();
      const wrapper = shallow(<TodoList handleDelete={mockHandleDelete} todos={data} />);

      const deleteBtn = wrapper.find('.delete-btn').at(0);
      deleteBtn.props().onClick();

      expect(mockHandleDelete).toHaveBeenCalledWith(1);
    });
  });
});
