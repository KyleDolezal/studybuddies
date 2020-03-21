import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import Header from '../components/header';

let container = null;
const mockCallback = jest.fn((event, eventName) => {});

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Welcomes the user, if one is present", () => {
  act(() => {
    render(<Header user="happy user"/>, container);
  });

  const userInput = container.querySelector('span');
  expect(userInput.textContent).toBe("Welcome, happy user");
});

it("Provides a generic greeting if no user is present", () => {
  act(() => {
    render(<Header />, container);
  });

  const userInput = container.querySelector('span');
  expect(userInput.textContent).toBe("Welcome");
});
