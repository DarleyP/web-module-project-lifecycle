import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
      <h2>Todos</h2>
      {
        this.props.todos.reduce((acc,todo) => {
          if(this.props.displayCompleted || !todo.completed) return acc.concat(
          <Todo 
          toggleComplete={this.props.toggleComplete} 
          todo={todo}
          key={todo.id}
          />)
          return acc
        },[])
        // this.state.todos.map(todo => {
        //   return (
        //     <div onClick={this.toggleComplete(todo.id)} key={todo.id}>{todo.name} {todo.completed ? ' ✔️' : ''}</div>
        //   )
        // })
      }
    </div>
    )
  }
}
