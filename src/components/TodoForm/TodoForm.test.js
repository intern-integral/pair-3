import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  describe('#render', () => {
    it('should render input field correctly', () => {
      const wrapper = mount(<TodoForm />);

      const titleField = wrapper.find('.title-field');
      const descriptionField = wrapper.find('.description-field');

      expect(titleField).toHaveLength(1);
      expect(descriptionField).toHaveLength(1);
    });

    it('should render add button', () => {
      const wrapper = mount(<TodoForm />);

      const addBtn = wrapper.find('.add-btn');

      expect(addBtn).toHaveLength(1);
    });
  });

  describe('#handleAdd', () => {
    it('should invoke handleAdd with correct params', async () => {
      const mockHandleAdd = jest.fn();
      const wrapper = mount(<TodoForm handleAdd={mockHandleAdd} />);

      const titleField = wrapper.find('.title-field');
      const descriptionField = wrapper.find('.description-field');
      const addBtn = wrapper.find('.add-btn');

      await act(async () => {
        await titleField.simulate('change', { target: { value: 'halo halo hehe' } });
        await descriptionField.simulate('change', { target: { value: 'tayo the little bus' } });
        await addBtn.simulate('click');
      });

      expect(mockHandleAdd).toHaveBeenCalledWith('halo halo hehe', 'tayo the little bus');
    });
  });

  describe('#handleUpdate', () => {
    it('should invoke handleUpdate with correct params', async () => {
      const mockHandleUpdate = jest.fn();
      const mockData = [{ _id: '6051c7bd06526d5760007b81', title: 'Hello World', description: 'Duaaar ini todo list pertama hore' }];
      const wrapper = mount(<TodoForm handleUpdate={mockHandleUpdate} todoData={mockData} />);

      const titleField = wrapper.find('.title-field');
      const descriptionField = wrapper.find('.description-field');
      const addBtn = wrapper.find('.add-btn');

      await act(async () => {
        await titleField.simulate('change', { target: { value: 'mau update' } });
        await descriptionField.simulate('change', { target: { value: 'apakah uda keupdate' } });
        await addBtn.simulate('click');
      });

      expect(mockHandleUpdate).toHaveBeenCalledWith('6051c7bd06526d5760007b81', 'mau update', 'apakah uda keupdate');
    });
  });
});
