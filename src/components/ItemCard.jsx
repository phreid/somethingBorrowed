import React from 'react';

function ItemCard(props){
    return(
        <div>
            <div className="item-card">
                <img className="item-image"
                     src ={props.image}
                     alt= "item-image"/>
                <h5 className="item-name">{props.name}</h5>
                <p className="item-description">{props.description}</p>
                <p className="item-type">{props.type}</p>
                <p className="item-location">{props.location}</p>
            </div>

        </div>
    )
}

export default ItemCard;