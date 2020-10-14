import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'
test('renders single blog correctly', () => {
  const blog = {
    title: "example",
    author: "tester",
    url: "localhost",
    likes: 20
  }
  const component = render(
    <Blog blog={blog} />
  )
  
  expect(component.container.querySelector(".blog-title")).toHaveTextContent(blog.title);
  expect(component.container.querySelector(".blog-author")).toHaveTextContent(blog.author);
  expect(component.container.querySelector(".blog-likes")).toBe(null)
  expect(component.container.querySelector(".blog-url")).toBe(null)


});