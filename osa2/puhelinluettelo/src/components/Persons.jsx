const Persons = ({ personsToShow }) => {
  return (
    <table>
      <tbody>
        {personsToShow.map(person => (
          <tr key={person.name}>
            <td>
              {person.name} &nbsp;
              {person.number}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Persons