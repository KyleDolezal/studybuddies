import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import{act} from 'react-dom/test-utils';
import {fireEvent} from '@testing-library/react';

import SimpleList from '../components/SimpleList';

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

it("renders the appropriate text, based on props", () => {
  act(() => {
    render(<SimpleList
              interests={[{id: 1, attributes: {title: 'title'}}]}
              header="header"/>, container);
  });

  const header = container.querySelector('h3');
  expect(header.textContent).toBe("header");
  const li = container.querySelector('li');
  expect(li.textContent).toBe("title");
});
