import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import {fireEvent} from '@testing-library/react';
import { mount, shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import Home from '../components/Home'
import SimpleList from '../components/SimpleList'
import * as fetch_with_auth_headers from '../modules/fetch_wrapper'
import * as parseUserInterests from '../modules/parse_user_interests'
import JestMockPromise from "jest-mock-promise";

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
    fetch.mockResponseOnce(JSON.stringify({included: []}));
    render(<Home auth_token="token" setAuthToken={()=>{}} interestsPath="/path" user_id="1"/>, container);
  });

  const response = {};
  response.errors = [];

  fetch.mockResponseOnce(JSON.stringify(response));

  const interestField = container.querySelector('input');
  fireEvent.change(interestField, {target: {value: 'asdf'}});

  const button = container.querySelector('button');
  fetch.enableMocks();
  fireEvent.click(button, { button: 1 });

  expect(fetch.mock.calls.length).toEqual(2);

  expect(fetch.mock.calls[1][0]).toEqual('/path');
  expect(fetch.mock.calls[1][1]['method']).toEqual('POST');
  expect(fetch.mock.calls[1][1]['body']).toEqual("{\"user_interest\":{\"title\":\"asdf\",\"flashMessage\":\"\",\"interests\":[]}}");
});

it("has interests", () => {
  fetch.mockResponseOnce(JSON.stringify({included: []}));
  const wrapper = mount(<Home auth_token="token" setAuthToken={()=>{}} interestsPath="/path"/>);
  expect(wrapper.html().search("title")).toEqual(-1)
  wrapper.setState({ interests: [{title: "title", id: 1}]});
  expect(wrapper.containsMatchingElement(<SimpleList/>)).toEqual(true);
  expect(wrapper.isEmptyRender()).toEqual(false);
  expect(wrapper.html().search("title") > 0).toEqual(true)
});

it("grabs the interest info for the user", () => {
  act(() => {
    fetch.mockResponseOnce(JSON.stringify({included: [{"id": "1", "attributes": {"type": "interest", "title": "title"}}]}));
    render(<Home auth_token="token" setAuthToken={()=>{}} interestsPath="/path" user_id="1"/>, container);
  });

  expect(fetch.mock.calls[0][0]).toEqual('/path/user_id=1');
  expect(fetch.mock.calls[0][1]['method']).toEqual('GET');
});

it("parses interests to display them to the user", () => {
  const interestClass = new class{
    json = ()=>{
              return({})
            }
    }()
  const interest_data = [{id: "1", "title": "title"}]

  fetch_with_auth_headers.default = jest.fn(()=>{return new JestMockPromise((res, rej)=>{res(interestClass)})})
  let wrapper = null

  const parseSpy = jest.fn(()=>{return interest_data})
  parseUserInterests.default = parseSpy

  const setStateSpy = jest.fn()
  Home.prototype.setState = setStateSpy

  fetch.mockResponseOnce(JSON.stringify({included: [{"id": "1", "type": "interests", "attributes": {"title": "title"}}]}));
  wrapper = shallow(<Home auth_token="token" setAuthToken={()=>{}} interestsPath="/path" user_id="1" />);

  expect(setStateSpy).toHaveBeenCalledWith({"interests": [{"id": "1","title": "title"}]})
});
