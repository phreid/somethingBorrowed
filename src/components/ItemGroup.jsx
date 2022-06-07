import {useSelector, useDispatch} from 'react-redux';

export default function ItemGroup(props) {
    const dynamicList = useSelector(state => state.reducerSD);
    return (
        <div>
            <b className="itemName">{props.itemName}</b>
            <img src = {props.itemIcon} className="itemIcon"/>
            <Text className="itemType" text="Type: "></Text><Text className="itemType" text={props.itemType}></Text>
            <Text className="itemRating" text="Rating: "></Text><Text className="itemRating" text={props.itemRating}></Text>
            <Text className="itemOwner" text="Owner: "></Text><Text className="itemOwner" text={props.itemOwner}></Text>
            <Text className="itemLocation" text="Location: "></Text><Text className="itemLocation" text={props.itemLocation}></Text>
            <Text className="itemDescription" text="Description: "></Text><Text className="itemDescription" text={props.itemDescription}></Text>
            <br></br>
        </div>
    );
}