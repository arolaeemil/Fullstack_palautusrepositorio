const Persons = ({ personsToShow, submitDelete }) => {
  return (
    <table>
      <tbody>
        {personsToShow.map(person => (
          <tr key={person.name}>
            <td>
              {person.name} &nbsp;
              {person.number} &nbsp;
              <button onClick = {() => submitDelete(person.id)} type="submit">delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Persons