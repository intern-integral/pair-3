import React from 'react';
import { mount } from 'enzyme';
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
});
