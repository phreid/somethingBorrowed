import React from 'react';
import ItemCard from "./ItemCard";
import {useSelector} from "react-redux";

function RecipeList(){
    let items = useSelector(state => state)
    return(
        <div className="item-container">
            {items.map(item =>{
                return <ItemCard key={item.id}
                                 image={item.image}
                                 name={item.name}
                                 description={item.description}
                                 type={item.type}
                                 location={item.location}

                />
            })}
        </div>
    )
}

export default RecipeList;