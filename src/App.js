import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Task from './components/Task';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TaskDetails from './components/TaskDetails';
import PageNotFound from './components/PageNotFound';



function App() {
  const router = createHashRouter([
    {
      path:'/',
      element:<><Navbar/><Home/></>
    },
    {
      path:'/task',
      element:<><Navbar/><Task/></>
    },
    {
      path:'/task/:id',
      element:<><Navbar/><TaskDetails/></>
    },
    {
      path:'*',
      element:<><PageNotFound/></>
    },
  ])
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
