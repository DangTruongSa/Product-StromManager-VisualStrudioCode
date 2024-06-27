
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './pages/home';
import user from './pages/user';
import edituser from './pages/edituser';
import distributor from './pages/distributor';
import editdistributor from './pages/editdistributor';
import registeruser from './pages/registeruser';
import adddistributor from './pages/adddistributor';
import fruit from './pages/fruit';
import addfruit from './pages/addfruit';
import editfruit from './pages/editfruit';
import login from './pages/login';
import register from './pages/register';


import logo from './pages/img/logos.png';
import human from './pages/img/humam.png';

function App() {
  return (
    <div className="container">
      <nav className="Main-menu">
        <a href='/home'><img className="left-menu" src={logo} alt="" width="" height="" /></a>
        <ul className="mid-menu">
          <li><a href="/user">User</a></li>
          <li><a href="/distributor">Distributor</a></li>
          <li><a href="/fruit">Fruit</a></li>
        </ul>
        <div className="right-menu">
          <ul>
            <li><a href="">Hỗ trợ</a></li>
            <li><a href="">Doanh nghiệp</a></li>
          </ul>

          <a href="/login"><img src={human} alt="" width="24" height="24" /></a>

        </div>
      </nav>

      <Router>
        <Switch>
          <Route path="/home" exact component={user} />
          <Route path="/user" exact component={user} />
          <Route path="/registeruser" exact component={registeruser} />
          <Route path="/edituser/:id" exact component={edituser} />
          <Route path="/distributor" exact component={distributor} />
          <Route path="/adddistributor" exact component={adddistributor} />
          <Route path="/editdistributor/:id" exact component={editdistributor} />
          <Route path="/fruit" exact component={fruit} />
          <Route path="/addfruit" exact component={addfruit} />
          <Route path="/login" exact component={login} />
          <Route path="/register" exact component={register} />
          <Route path="/editfruit/:id" exact component={editfruit} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
