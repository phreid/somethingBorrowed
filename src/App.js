import { useEffect } from 'react';
import {Provider} from 'react-redux'
import './styles.css';
import rootReducer from './reducer/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import NavBar from './components/NavBar';

function App() {
  const store = configureStore({reducer: rootReducer});
  useEffect(()=>{
    document.title="Something Borrowed";
  })

  return (
    <Provider store={store}>
      <div className="App">
        <NavBar currPage="User Home" key="User Home"/>
    </div>
    </Provider>
    
  )
}

export default App;
