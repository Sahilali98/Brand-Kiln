import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function TaskDetails() {
    const tasks = useSelector((state) => state.tasks.value)
    const params = useParams();
    const [list, setList] = useState({});

    useEffect(() => {
      let list = tasks.filter((item) => {
        return item.id === params;
      });

      setList({...list[0]});
        
    }, [params])
    
    return (
        <div className='text-white container'>
            This is user page
            I am user {list.title}
        </div>
    )
}

export default TaskDetails
