const Filter = ({filter, setFilter}) => {
  const handleFilterChange = event => {
    const newFilter = event.target.value
    setFilter(newFilter)    
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter