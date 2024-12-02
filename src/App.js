import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Task from './components/Task';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TaskDetails from './components/TaskDetails';
import PageNotFound from './components/PageNotFound';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <><Navbar/><Home/></>
    },
    {
      path:'/task',
      element: <><Navbar/><Task/></>
    },
    {
      path:'/task/:id',
      element:<><Navbar/><TaskDetails/></>
    },
    // {
    //   path:'*',
    //   element:<PageNotFound/>
    // }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
