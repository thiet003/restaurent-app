import logo from './logo.svg';
import './App.css';
import DishesList from './components/admin/getAllDishes.jsx';
import CreateDish from './components/admin/AddDish.jsx';
import UpdateDish from './components/admin/UpdateDish.jsx';
import DetailDish from './components/admin/DetailDish.jsx';
import Home from './components/client/Home.jsx';
import EmployeeLogin from './components/admin/EmployeeLogin.jsx';
import AdminHomePage from './components/admin/HomePage.jsx';
import AddEmployee from './components/admin/AddEmployee.jsx';
import ListEmployee from './components/admin/ListEmployee.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin/v1" element={<AdminHomePage />} />
          <Route path="/admin/v1/list-dishes" element={<DishesList />} />
          <Route path="/admin/v1/create-dish" element={<CreateDish />} />
          <Route path="/admin/v1/update-dish/:id" element={<UpdateDish />} />
          <Route path="/admin/v1/detail-dish/:id" element={<DetailDish />} />
          
          <Route path="/admin/v1/login" element={<EmployeeLogin />} />
          <Route path="/admin/v1/add-employee" element={<AddEmployee />} />
          <Route path="/admin/v1/list-employees" element={<ListEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
