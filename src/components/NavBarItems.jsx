import React, { useState, useEffect } from 'react';
import logo from '../logo.png'
import '../index.css';
import {updateNavItem} from '../actions/actionsSD'
import {useSelector, useDispatch} from 'react-redux';


export default function NavBarItems(prop) {
    const dynamicList = useSelector(state => state.reducerNavBar);
    return <>
        <div className='navBarItemsBox'>
            {dynamicList.map(function(ele){
                if(ele===prop.currPage){
                    return <><b className='navBarItems' key={ele} id={ele}>{ele}</b><div className='verticalLine'></div></>
                }
                return <><div className='navBarItems' key={ele} id={ele}>{ele}</div><div className='verticalLine'></div></>;
            })}
        </div>
    </>;
}