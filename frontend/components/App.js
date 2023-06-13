import React from 'react'
import axios from 'axios';

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

  toggleDisplayComplete = (evt) => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted
    })
  }

  render() {
    return (
      <div>
        <div id="error">Error {this.state.error}</div>
        <div id="todos">
          <h2>Todos</h2>
          {
            this.state.todos.reduce((acc,todo) => {
              if(this.state.displayCompleted || !todo.completed) return acc.concat(
              <div onClick={this.toggleComplete(todo.id)} key={todo.id}>{todo.name} {todo.completed ? ' ✔️' : ''}</div>
              )
              return acc
            },[])
            // this.state.todos.map(todo => {
            //   return (
            //     <div onClick={this.toggleComplete(todo.id)} key={todo.id}>{todo.name} {todo.completed ? ' ✔️' : ''}</div>
            //   )
            // })
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.tdNameInput} onChange={this.onTdNameInputChange} type="text" placeholder='Type todo'></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.toggleDisplayComplete}>{this.state.displayCompleted ? "Hide" : "Show"}Completed</button>
      </div>
    )
  }
}
