import React from 'react';

function ItemCard(props){
    return(
        <div className="card mb-3" style="max-width: 600px;">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img className="card-img" src={props.image}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-text">{props.description}</p>
                        <p className="card-text"><small className="text-muted">{props.type}</small></p>
                        <p className="card-text"><small className="text-muted">{props.location}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;