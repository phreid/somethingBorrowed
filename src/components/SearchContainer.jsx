
import '../styles.css';
import {useDispatch, useSelector} from 'react-redux';
import { navBarItems } from '../redux/navBarItems';
var { v4: uuid } = require('uuid');

export default function SearchContainer(props) {
    return <><div className='SearchContainer' key={uuid()}>
            <h3>searching</h3>
        </div></>;
}