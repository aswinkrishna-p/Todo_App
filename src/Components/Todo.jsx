import React from "react";
import './Todo.css'
import { useState , useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";





function Todo () {

    const [todo , setTodo ] = useState('')
    const [todos ,setTodos] = useState([])
    const [editId ,setEditID] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')

    const [test , settest] = useState(1)



    const handleSubmit =(e) => {
        e.preventDefault()
    }

    const addTodo  =() =>{
       if(todo.trim() !== ''){

        const isDuplicate = todos.some((item) => item.list === todo.trim())

        if(!isDuplicate){
            setTodos([...todos,{list: todo , id: Date.now() , status : false}])
            console.log(todos);
            setTodo('')
            setErrorMessage("")
        }else{
            setErrorMessage('Duplicate todo. not added')
        }
       }else{
        setErrorMessage("TODO can't be empty")
       }

       if(editId){
        const editTodo = todos.find((todo)=> todo.id == editId)
        const updateTodo = todos.map((tod)=> tod.id === editTodo.id
        ? (tod = {id : tod.id , list : todo}):(tod = {id: tod.id , list : tod.list}))
        setTodos(updateTodo)
        setEditID(0);
        setTodo('')
       }
    }

    const inputRef = useRef('null')

    useEffect(()=>{
        inputRef.current.focus()
    })

    const onDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const onComplete = (id) => {
        let complete = todos.map((list)=>{
            if(list.id === id){
                return ({...list , status : !list.status})
            }
            return list
        })
        setTodos(complete)
    }


    const onEdit = (id) => {
        const editTodo = todos.find((tod) => tod.id === id);
      
        if (!editTodo.status) {
          setTodo(editTodo.list);
          setEditID(editTodo.id);
        } else {
          setErrorMessage("Cannot edit a completed task.");
        }
      };

    return (
        <div className="container">
          <h2>TODO APP</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form className="form-group" onSubmit={handleSubmit}>
            <input type="text" value={todo} ref={inputRef} placeholder="Enter Your TODO" className="form-control" onChange={(event)=> setTodo(event.target.value)} /> 
            <button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'}</button>
          </form>
          <div className="list">
            <ul>
               {
                  todos.map((tod) =>(
                    <li className="list-items">
                        <div className="list-item-list" id= {tod.status ? 'list-item' : ''}>{tod.list}</div>
                        <div> {test}</div>
                       <span>
                         <IoMdDoneAll className="list-item-icons" id="complete" title="Complete" onClick={() => onComplete(tod.id)}/>
                         <FiEdit className="list-item-icons" id="edit" title="Edit" onClick={() => onEdit(tod.id)}/>
                         <MdDelete className="list-item-icons" id="delete" title="Delete" onClick={() => onDelete(tod.id)}/>
                        </span>
                    </li>
                ))}
            </ul>
          </div>
        </div>
    )
}


export default Todo;