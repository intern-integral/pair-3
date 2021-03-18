import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './TodoList';

describe('TodoList', () => {
  const data = [
    { _id: '6051c7bd06526d5760007b81', title: 'Hello World', description: 'Duaaar ini todo list pertama hore' },
    { _id: '6051c7ae06526d5760007b80', title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
    { _id: '6051c79d06526d5760007b7f', title: 'hehe iseng', description: 'mbeeeee' }
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

    it('should render edit button', () => {
      const wrapper = shallow(<TodoList todos={data} />);

      const editBtn = wrapper.find('.edit-btn');

      expect(editBtn).toHaveLength(3);
    });
  });

  describe('#handleDelete', () => {
    it('should invoke handleDelete function when delete button clicked', () => {
      const mockHandleDelete = jest.fn();
      const wrapper = shallow(<TodoList handleDelete={mockHandleDelete} todos={data} />);

      const deleteBtn = wrapper.find('.delete-btn').at(0);
      deleteBtn.props().onClick();

      expect(mockHandleDelete).toHaveBeenCalledWith('6051c7bd06526d5760007b81');
    });
  });

  describe('#handleEdit', () => {
    it('should invoke handleEdit function when edit button clicked', () => {
      const mockHandleEdit = jest.fn();
      const wrapper = shallow(<TodoList handleEdit={mockHandleEdit} todos={data} />);

      const editBtn = wrapper.find('.edit-btn').at(1);
      editBtn.props().onClick();

      expect(mockHandleEdit).toHaveBeenCalledWith('6051c7ae06526d5760007b80');
    });
  });
});
