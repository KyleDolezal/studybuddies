import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import {fireEvent} from '@testing-library/react';

import Home from '../components/Home'

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
  expect(fetch.mock.calls[0][1]['body']).toEqual("{\"title\":\"asdf\",\"flashMessage\":\"\"}");
});
