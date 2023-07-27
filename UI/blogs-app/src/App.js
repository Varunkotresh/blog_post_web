import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Login from './Components/Login';
import Comments from './Components/Comments';
import Create from './Components/Create';
import Register from './Components/Register';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
     <Header />
     <div className='container'>
     <main>
     <Routes>
     <Route path='/Login' Component={Login} />
     <Route path='/home' Component={Home} />
     <Route path='/Comments/:id' Component={Comments} />
     <Route path='/create' Component={Create} />
     <Route path='/register' Component={Register} />
     {/* <Route path='/products/:id' Component={Product} /> */}
     
     </Routes>
     </main>
     </div>
    </div>
    </Router>
  );
}

export default App;
