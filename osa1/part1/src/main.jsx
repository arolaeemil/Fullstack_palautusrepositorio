import ReactDOM from 'react-dom/client'

import App from './App'

let counter = 1

const root = ReactDOM.createRoot(document.getElementById("root"))

const refresh = () => {
  root.render(<App counter={counter} />)
}

setInterval(() => {
    refresh()
    counter += 1
  }, 1000)

// refresh()
// counter += 1
// refresh()
// counter += 1
// refresh()

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <App counter={counter} />
// )

// a + c osan alku.
// ReactDOM.createRoot(document.getElementById('root')).render(<App />)