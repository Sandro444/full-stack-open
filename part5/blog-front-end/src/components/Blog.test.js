import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog'
import {BlogInfo} from "./BlogInfo"
import BlogForm from "./BlogForm"
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

test('renders blog details after clicking button', () => {
    const blog = {
      title: "example",
      author: "tester",
      url: "localhost",
      likes: 20
    }
    const component = render(
      <Blog blog={blog} />
    )
    
    const button = component.container.querySelector(".blog-show-button")

    fireEvent.click(button)

    expect(component.container.querySelector(".blog-title")).toHaveTextContent(blog.title);
    expect(component.container.querySelector(".blog-author")).toHaveTextContent(blog.author);
    expect(component.container.querySelector(".blog-likes")).toHaveTextContent(blog.likes)
    expect(component.container.querySelector(".blog-url")).toHaveTextContent(blog.url)
  
  
  });

  test('clicks twice when cliking like twice', () => {
    const blog = {
      title: "example",
      author: "tester",
      url: "localhost",
      likes: 20
    }
    const mockLike = jest.fn()
    const component = render(
      <BlogInfo blog={blog} testLikeFunction={mockLike} />
    )

   
    
    const button = component.container.querySelector(".blog-like-button")

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockLike.mock.calls).toHaveLength(2)
  
  
  });

  test('test that blog form is filled', () => {
    const blog = {
      title: "example",
      author: "tester",
      url: "localhost",
      likes: 20
    }
    const mockHandleSubmit = jest.fn()
    const mockHandleShowForm = jest.fn()
    const component = render(
      <BlogForm handleBlogSubmit={mockHandleSubmit} setShowForm={mockHandleShowForm} />
    )

   
    
    const form = component.container.querySelector(".create-form")

    const title = component.container.querySelector(".blog-create-title")
    const author = component.container.querySelector(".blog-create-author")
    const url = component.container.querySelector(".blog-create-url")

    fireEvent.change(title, { 
        target: { value: 'testing of forms could be easier' } 
      })
      fireEvent.change(url, { 
        target: { value: 'localhost' } 
      })
      fireEvent.change(author, { 
        target: { value: 'tester' } 
      })
      fireEvent.submit(form)

    expect(mockHandleSubmit.mock.calls).toHaveLength(1)
    expect(mockHandleSubmit.mock.calls[0][1].title).toBe('testing of forms could be easier')
    expect(mockHandleSubmit.mock.calls[0][1].author).toBe('tester')
    expect(mockHandleSubmit.mock.calls[0][1].url).toBe('localhost')
  });