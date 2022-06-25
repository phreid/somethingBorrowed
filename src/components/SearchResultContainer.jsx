import { useSelector } from 'react-redux'
function SearchResultContainer (props) {
  const keyWord = props.searchText
  const items = useSelector(state => state.itemsSlice.items)

  let count = 0
  items.map(function (item) {
    if (item.name.toLowerCase().includes(keyWord)) {
      count++
    }
	 })
	 return <div id={keyWord}>{'Number of Research Result: ' + count}</div>
}
export default SearchResultContainer
