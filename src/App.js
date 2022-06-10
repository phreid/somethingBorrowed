import { useEffect } from 'react';
import './styles.css';
import NavBar from './components/NavBar';

import AddItemForm from "./components/AddItemForm";

function App() {
  useEffect(()=>{
    document.title="Something Borrowed";
  })

  return (
      <div className="App">
      </div>
  )
}

export default App;
