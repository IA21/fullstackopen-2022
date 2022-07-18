const Filter = ({ filterName, handleFilterChange }) => {
   return (
      <label>filter shown with <input value={filterName} onChange={handleFilterChange} /></label>
   )
}

export default Filter