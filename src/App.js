import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Livros from './components/Livros'
import Pessoas from './components/Pessoas'
import Series from './components/Series'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
            {"Página não existe"}
        </Route>
        <Route path="/livro">
            <Livros />
        </Route>
        <Route path="/pessoa">
            <Pessoas />
        </Route>
        <Route path="/Serie">
            <Series />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
