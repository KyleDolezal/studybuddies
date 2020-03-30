import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import {fireEvent} from '@testing-library/react';
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import Home from '../components/Home'
import SimpleList from '../components/SimpleList'

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("posts form information to the proper endpoint", () => {
  act(() => {
    render(<Home auth_token="token" setAuthToken={()=>{}} newInterestPath="/path"/>, container);
  });

  const response = {};
  response.errors = [];

  fetch.mockResponseOnce(JSON.stringify(response));

  const interestField = container.querySelector('input');
  fireEvent.change(interestField, {target: {value: 'asdf'}});

  const button = container.querySelector('button');
  fetch.enableMocks();
  fireEvent.click(button, { button: 1 });

  expect(fetch.mock.calls.length).toEqual(1);

  expect(fetch.mock.calls[0][0]).toEqual('/path');
  expect(fetch.mock.calls[0][1]['method']).toEqual('POST');
  expect(fetch.mock.calls[0][1]['body']).toEqual("{\"user_interest\":{\"title\":\"asdf\",\"flashMessage\":\"\",\"interests\":[]}}");
});

it("has interests", () => {
  act(() => {
    render(<Home auth_token="token" setAuthToken={()=>{}} newInterestPath="/path"/>, container);
  });
  const wrapper = mount(<Home auth_token="token" setAuthToken={()=>{}} newInterestPath="/path"/>);
  expect(wrapper.html().search("title")).toEqual(-1)
  wrapper.setState({ interests: [{attributes: {title: "title"}, id: 1}]});
  expect(wrapper.containsMatchingElement(<SimpleList/>)).toEqual(true);
  expect(wrapper.isEmptyRender()).toEqual(false);
  expect(wrapper.html().search("title") > 0).toEqual(true)
});
