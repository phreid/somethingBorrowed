import logo from '../images/logo.png'
import '../styles.css';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { navBarItems } from '../redux/navBarItems';
var { v4: uuid } = require('uuid');

export default function NavBar(props) {
    const dynamicList = useSelector(state => navBarItems);
    // alert(dynamicList);
    
    const linkStyle = {
        color: 'blue'
      };
    return <div className='navBar' key={uuid()}>
        <img src={logo} className="App-logo" alt="logo"/>
        <div className='navBarItemsBox'>
            <nav> 
            {dynamicList.map(function(number){
                if(number===props.currPage){
                  return <div key={uuid()}><Link to={"/"+number} className='navBarItems' style={linkStyle}>{number}</Link><div className='verticalLine'></div></div>;
                }  
                return <div key={uuid()}><Link to={"/"+number} className='navBarItems' >{number}</Link><div className='verticalLine'></div></div>;
              } 
            )}
            </nav>
        </div>
        
    </div>;
}