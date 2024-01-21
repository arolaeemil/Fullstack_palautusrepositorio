const Countries = ({countriesToShow, showCountry}) => {
  if (countriesToShow.length>10) {
    return (
      <>
      Too many matches, specify another filter
      </>
    )   
  }

  if (countriesToShow.length===1) {
    return (
      <>
      <h1>{countriesToShow[0].name.common}</h1>
      capital: {countriesToShow[0].capital}<br />
      area: {countriesToShow[0].area} km<sup>2</sup><br />
      <h2>languages:</h2>
      {/* <h2>{countriesToShow[0].languages.fin}</h2> */}
      <ul>
        {Object.entries(countriesToShow[0].languages).map(([code, name]) => (
          <li key={code}>{code}: {name}</li>
        ))}
      </ul>
      <h2>flag:</h2>
      <img src={countriesToShow[0].flags.png} alt="Flag" />
      </>
    )   
  }

  return (
    <table>
      <tbody>
        {countriesToShow.map(country => (
          <tr key={country.name.common}>
            <td>
              {country.name.common}
              <button onClick = {() => showCountry(country.name.common)} type="submit">Show</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Countries