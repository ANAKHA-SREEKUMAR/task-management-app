import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Input() {
  const [flag, setFlag] = useState(true);
  const [task, setTask] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/list").then(res=>{
      setTask(res.data);
    })
  },[])

  function submit() {
    setFlag(!flag);
    var data = {
      task: document.getElementById("task-name").value,
      isDone: false,
    };
    axios.post("http://localhost:8080/create",data).then(res=>{
      setTask(res.data);
    })
  }

  function complete(id){
    axios.get("http://localhost:8080/upd/"+id).then(res=>{
      setTask(res.data);
    })
  }
  
  
  function deletes(id){
    axios.get("http://localhost:8080/delete/"+id).then(res=>{
      setTask(res.data);
    })
  }



  return (
    <div className="container">
      <div className="logo">
        <h3>Task</h3>
        <hr />
      </div>
      <div className="input-section">
        {flag ? (
          <div>
            <button className="add-task" onClick={() => setFlag(!flag)}>
              <h3>Add New</h3>
            </button>
          </div>
        ) : (
          <div>
            <input
              className="add-input"
              type="text"
              id="task-name"
              placeholder="Enter task name"
            />
            <button className="add-btn" onClick={submit}>
              click
            </button>
          </div>
        )}
      </div>
      <hr />
      <div className="list">
        {task.map((data) => (
          <div key={data.id} className="list-item">
            <input className="checkbox" onClick={()=>complete(data.id)} type="checkbox" checked={data.done}/>
            {data.done?(<h4 style={{textDecoration:"line-through",color:"rgba(36, 36, 36,0.5)"}}>{data.task}</h4>):( <h4>{data.task}</h4> )}
            <img onClick={()=>deletes(data.id)} src="https://img.icons8.com/color/22/fa314a/delete-forever.png" alt="delete"/>
          </div>
        ))}
      </div>
    </div>
  );
}
