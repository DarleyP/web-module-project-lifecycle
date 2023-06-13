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
    }
  }

  onTdNameInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ ...this.state, tdNameInput: value })
  }

  fetchAllTodos() {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message })
      })
  }




  postNewTodo = () => {
    axios.post(URL,{ name: this.state.tdNameInput})
    .then( res => {
      this.fetchAllTodos()
      this.setState({...this.state, tdNameInput: ''})
    })
    .catch( err=>{
      this.setState({ ...this.state, error: err.response.data.message })
    })

  }

  onTodoFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        <div id="error">Error {this.state.error}</div>
        <div id="todos">
          <h2>Todos</h2>
          {
            this.state.todos.map(todo => {
              return (
                <div key={todo.id}>{todo.name}</div>
              )
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.tdNameInput} onChange={this.onTdNameInputChange} type="text" placeholder='Type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>

        </form>
      </div>
    )
  }
}
