import { useEffect, useState } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([])

  async function fetchTodos(){
    const res=await fetch("http://localhost:3000/todos");
    const data=await res.json();
    setTodos(data.todos);
  }
  
  useEffect(()=>{
    fetchTodos();
  },[]);
    
  return (
    <div>
      <CreateTodo onAddTodo={fetchTodos}></CreateTodo> 
      <Todos todos={todos}></Todos>
    </div>
  )
}

export default App
