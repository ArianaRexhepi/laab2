import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Pages from './components/Pages';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
    <div className="App">
      <>
      <Nav/>
      <Pages/>
      </>
    </div>
    </Router>
  );
}

export default App;
