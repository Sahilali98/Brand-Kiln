import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function TaskDetails() {
  const tasks = useSelector((state) => state.tasks.value)
  const params = useParams();
  const [list, setList] = useState({});

  useEffect(() => {
    let list = tasks.filter((item) => {
      return item.id.toString() === params.id;
    });

    setList({ ...list[0] });

  }, [params.id, tasks])
  

  return (
    <div className='text-danger container my-5 bg-light rounded p-5'>
      <div className='bg-white rounded'>
        <h1>Task Title</h1>
        <h2 className='text-success'>{list.title}</h2>
      </div>
      <div className='bg-white rounded'>
        <h1 >Task Describtion</h1>
        <h2>{list.desc}</h2>
      </div>
      <div className='bg-white rounded'>
        <h1>Task Due Date</h1>
        <h2>{list.dueDate}</h2>
      </div>
    </div>
  )
}

export default TaskDetails
