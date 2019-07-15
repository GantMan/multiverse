import React from 'react'
import './App.css'

function App() {
  let urlParams = new URLSearchParams(window.location.search)
  let tacoResult = urlParams.get('taco')
  return (
    <div className="App">
      <header className="App-header">
        <h3>Build 4 - Can I read URL params?</h3>
        <h4>URL param taco = {tacoResult}</h4>
      </header>
    </div>
  )
}

export default App
