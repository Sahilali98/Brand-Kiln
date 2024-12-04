import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isTaskCompleted, taskDelete } from '../redux/tasks/tasksSlice'

function Home() {
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();

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


  return (
    <div className='text-white container my-5'>
      {
        tasks.length ? <h1 className='my-3'>Tasks</h1> : <h1 className='my-3'>No Tasks</h1>
      }
      <hr class="bg-white border-2 border-top border-white" />
      {
        tasks.map((task) => {
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

export default Home
