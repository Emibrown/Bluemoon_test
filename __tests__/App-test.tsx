/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../src/screens/Home';
import Create from '../src/screens/Create';
import Edit from '../src/screens/Edit';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const initialState = {
  inventory: [],
  loading: true,
  name: "Blue Moon"
}
const mockStore = configureStore()
let store

test('snapshots of Home screen', () => {
  store = mockStore(initialState)
  const home = renderer.create(<Provider store={store}><Home  /></Provider>).toJSON();
  expect(home).toMatchSnapshot();
});

test('snapshots of Create screen', () => {
  store = mockStore(initialState)
  const create = renderer.create(<Provider store={store}><Create  /></Provider>).toJSON();
  expect(create).toMatchSnapshot();
});

test('snapshots of Edit screen', () => {
  store = mockStore(initialState)
  const params = jest.fn();
  const edit = renderer.create(<Provider store={store}><Edit route = {{params}}  /></Provider>).toJSON();
  expect(edit).toMatchSnapshot();
});

