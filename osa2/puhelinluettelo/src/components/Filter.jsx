const Filter = ({ value, onChange }) => {
    return (
      <form>
        Filter shown with <input value={value} onChange={onChange} />
      </form>
    )
  }
  
  export default Filter