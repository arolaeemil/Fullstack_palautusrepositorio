const Filter = ({ value, onChange }) => {
    return (
      <form>
        Write a part of country's name: <input value={value} onChange={onChange} />
      </form>
    )
  }
  
  export default Filter