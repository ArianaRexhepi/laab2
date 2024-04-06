import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Pages from './components/Pages';

function App() {
  return (
    <Router>
    <div className="App">
      <Pages/>
    </div>
    </Router>
  );
}

export default App;
