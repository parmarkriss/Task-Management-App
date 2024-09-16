import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Users/Register';
import Login from './components/Users/Login';
import TaskUser from './components/Users/TaskUser';
import ViewUser from './components/Users/ViewUser';
import EditTask from './components/Users/EditTask';


import Admin from './components/Admin/Admin';
import Admindashboard from './components/Admin/Admindashboard';
import AdminUpdate from './components/Admin/AdminUpdate';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/taskuser' element={<TaskUser />} />
        <Route path='/viewuser' element={<ViewUser />} />
        <Route path='/edit-task/:id' element={<EditTask />} />

        {/* admin */}
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/dashboard' element={<Admindashboard/>}></Route>
        <Route path='/adminupdate/:id' element={<AdminUpdate/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
