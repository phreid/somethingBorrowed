import { useSelector } from 'react-redux'
function SearchResultContainer (props) {
	const keyWord = props.searchText
	const items = useSelector(state => state.items.list)
	
	let count = 0;
	items.map(function (item) {
		if(item.name.toLowerCase().includes(keyWord)){
			count++;
		}
		return;
	 })
	 return <div id={keyWord}>{"Number of Research Result: "+count}</div>
}
export default SearchResultContainer

/**if(keyWord===''){
		return <div id={keyWord}>{items.length}</div>
	} */