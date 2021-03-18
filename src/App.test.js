import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  describe('#render', () => {
    it('should render App when loaded', () => {
      const wrapper = shallow(<App />);

      const todosComponent = wrapper.find('Todos');

      expect(todosComponent).toHaveLength(1);
    });
  });
});
