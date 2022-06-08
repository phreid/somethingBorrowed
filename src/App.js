import { useEffect } from 'react';
import './styles.css';
import ItemContainer from "./components/ItemContainer";

function App() {
  useEffect(()=>{
    document.title="Something Borrowed";
  })

  return (
    <div className="App">
      <ItemContainer />
    </div>
  )
}

export default App;
