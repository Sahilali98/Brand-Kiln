import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, isTaskCompleted, taskDelete, edit } from '../redux/tasks/tasksSlice'
import '../css/Task.css'


function Task() {
  const tasks = useSelector((state) => state.tasks.value)
  const dispatch = useDispatch();
  const [btnState, setBtnState] = useState(true)

  const [search, setSearch] = useState("");


  const [newList, setNewList] = useState([]);

  const editId = useRef("");

  useEffect(() => {
    setNewList([...tasks]);
  }, [tasks])


  const [payload, setPayload] = useState({
    title: "",
    desc: "",
    dueDate: ""
  });

  const handleOnChange = (e) => {
    setPayload({
      ...payload, [e.target.name]: e.target.value
    })
  }


  const addTask = () => {
    if (payload.title && payload.desc && payload.dueDate) {
      dispatch(add(payload));
      setPayload({
        ...payload,
        title: "",
        desc: "",
        dueDate: ""
      })
    }
    else {
      alert("Please fill empty blanks");
    }

  }

  const handleEdit = (e, id) => {
    let title;
    let desc;
    let dueDate;
    tasks.forEach(element => {
      if (id === element.id) {
        title = element.title;
        desc = element.desc;
        dueDate = element.dueDate;
      }
    });
    editId.current = id;
    setPayload({ ...payload, title: title, desc: desc, dueDate: dueDate });
    setBtnState(false);
  }

  const completeEdit = (e) => {
    if (payload.title && payload.desc && payload.dueDate) {
      let obj = tasks.filter((item) => {
        return item.id === editId.current
      });

      obj[0] = { ...obj[0], title: payload.title, desc: payload.desc, dueDate: payload.dueDate };
      dispatch(edit(obj[0]));
      setPayload({
        ...payload,
        title: "",
        desc: "",
        dueDate: ""
      });
      editId.current = "";
      setBtnState(true);
    }
    else {
      alert("Please fill empty blanks");
    }
  }

  const handleCompleteTask = (e, id) => {
    let isCompleted;

    tasks.forEach((item) => {
      if (item.id === id) {
        isCompleted = item.isCompleted;
      }
    });


    if (isCompleted) {
      isCompleted = false;
    }
    else {
      isCompleted = true;
    }

    let obj = tasks.filter((item) => {
      if (item.id === id) {
        return true;
      }
      else {
        return false;
      }
    });

    obj[0] = { ...obj[0], isCompleted: isCompleted };

    dispatch(isTaskCompleted(obj[0]));
  }


  const handleSelectOnChange = (e) => {
    if (e.target.value === "1") {
      let list = tasks.filter((item) => {
        return item.isCompleted === true;
      })
      setNewList([...list]);
    }
    else if (e.target.value === "2") {
      let list = tasks.filter((item) => {
        return item.isCompleted === false;
      })
      setNewList([...list]);
    }
    else if (e.target.value === "3") {
      const date = new Date();
      let currentDate = date.toJSON();
      let list = tasks.filter((item) => {
        return item.dueDate < currentDate.slice(0, 10);
      })
      setNewList([...list]);
    }
    else {
      setNewList([...tasks]);
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    let list = tasks.filter((item) => {
      return item.title === search;
    });

    if(list.length !== 0){
      setNewList([...list]);
    }
    else{
      setNewList([...tasks]);
    }

    console.log(list);

  }


  return (
    <div className='container p-5 my-5 bg-secondary rounded' style={{ height: 'auto' }}>
      <h1>Add Task Here</h1>
      <div className='row '>
        <div className='col'>
          <h4>Title</h4>
          <input type="text" name='title' className='w-100 rounded focus-ring p-2' value={payload.title} onChange={handleOnChange} />
        </div>
        <div className=' col'>
          <h4>Desc</h4>
          <input type="text" name='desc' className='w-100  rounded focus-ring p-2' value={payload.desc} onChange={handleOnChange} />
        </div>
        <div className=' col'>
          <h4>Due Date</h4>
          <input type="date" name='dueDate' className='w-100 rounded focus-ring p-2' value={payload.dueDate} onChange={handleOnChange} />
        </div>
        <div className='col d-flex justify-content-center flex-column'>
          {
            btnState ? <button onClick={addTask} className='btn btn-success ms-5'>Add</button> :
              <button onClick={completeEdit} className='btn btn-success ms-5'>Edit</button>
          }
        </div>
      </div>
      {
        tasks.length ? <h1 className='my-3'>Tasks</h1> : <h1 className='my-3'>No Tasks</h1>
      }
      <div className='row'>
        <select onChange={handleSelectOnChange} className="col-4 p-2 rounded">
          <option defaultValue='0'>All Tasks</option>
          <option value="1">Completed Tasks</option>
          <option value="2">Pending Tasks</option>
          <option value="3">Overdue Tasks</option>
        </select>
        
        <input onChange={handleSearch} value={search} placeholder='Title Search Here ...' type="text" className='col-4 ms-5 rounded' />
      </div>
      <hr class="bg-white border-2 border-top border-white" />
      {
        newList.map((task) => {
          return (
            <>
              <div key={task.id} className='bg-success rounded d-flex flex-lg-row flex-column align-items-center p-2 my-3'>
                <input checked={task.isCompleted ? 'checked' : ''} onChange={(e) => handleCompleteTask(e, task.id)} type="checkbox" className='mx-3' />
                <div className='w-25'>
                  <h4 className=''>Title</h4>
                  <h1 className='w-100 text-white'><div className={task.isCompleted ? 'text-decoration-line-through' : ''}>{task.title}</div></h1>
                </div>
                <div className='w-25 mx-3'>
                  <h4 className=''>Describtion</h4>
                  <h1 className='w-100 text-white'><div className={task.isCompleted ? 'text-decoration-line-through' : ''}>{task.desc}</div></h1>
                </div>
                <div className='w-25'>
                  <h4 className=''>Due Date</h4>
                  <h1 className='w-100 text-white'><div className={task.isCompleted ? 'text-decoration-line-through' : ''}>{task.dueDate}</div></h1>
                </div>
                <div className='d-flex align-item-center w-25 '>
                  <button className='btn btn-primary ' onClick={(e) => handleEdit(e, task.id)}>Edit</button>
                  <button onClick={(e) => dispatch(taskDelete(task.id))} className='btn btn-danger mx-2' id={task.id}>Delete</button>
                </div>
              </div>
            </>
          )
        })
      }

    </div>
  )
}

export default Task
