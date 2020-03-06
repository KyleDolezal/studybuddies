import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import{act} from 'react-dom/test-utils';
import {fireEvent} from '@testing-library/react';

import UserInput from '../components/userInput';

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

it("renders the appropriate text, based on props", () => {
  act(() => {
    render(<UserInput eventName="eventName"
            headerText="headerText"
            eventFunction={mockCallback}/>, container);
  });

  const userInput = container.querySelector('h3');
  expect(userInput.textContent).toBe("headerText");
});

it("fires the appropiate event when input is chnaged", () => {
  act(() => {
    render(<UserInput eventName="eventName"
            headerText="headerText"
            eventFunction={mockCallback}/>, container);
  });
  
  const inputField = container.querySelector('input');
  fireEvent.change(inputField, {target: {value: 'changed text'}});
  expect(mockCallback.mock.calls.length).toBe(1);
});
