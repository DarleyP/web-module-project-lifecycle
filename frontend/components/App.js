import React from 'react'
import axios from 'axios';
import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: "",
      tdNameInput: '',
      displayCompleted: true,
    }
  }

  onTdNameInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ ...this.state, tdNameInput: value })
  }

  resetForm = () => {
    this.setState({ ...this.state, tdNameInput: '' })
  }

  fetchAllTodos() {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseErr)
  }


  setAxiosResponseErr = (err) => {
    this.setState({ ...this.state, error: err.response.data.message })
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.tdNameInput })
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.concat(res.data.data)
        })
        this.resetForm()
      })
      .catch(this.setAxiosResponseErr)
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  toggleComplete = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.map(todo => {
          if (todo.id !== id) return todo
          return res.data.data
        })})
      })
      .catch(this.setAxiosResponseErr)
  }

  toggleDisplayComplete = () => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted
    })
  }

  render() {
    return (
      <div>
        <div id="error">Error {this.state.error}</div>
       <TodoList
        todos={this.state.todos}
        displayCompleted={this.state.displayCompleted}
        toggleComplete={this.toggleComplete}
       />
       <Form 
       onTodoFormSubmit={this.onTodoFormSubmit}
       tdNameInput={this.state.tdNameInput}
       onTdNameInputChange={this.onTdNameInputChange}
       toggleDisplayComplete={this.toggleDisplayComplete}
       displayCompleted={this.state.displayCompleted}
       />
      </div>
    )
  }
}
