const {useState} = require('react')

const initialItems = [
  {id: 1, description: 'Passports', quantity: 2, packed: false},
  {id: 2, description: 'Passports2', quantity: 3, packed: false},
]

export default function App() {
  
  const [valueFromChild, setValueFromChild] = useState('')
  initialItems.push(valueFromChild)

  return( 
    <div className="app">
      <Logo/>
      <From setValueFromChild={setValueFromChild} />
      <PackingList />
      <States/>
    </div>
  )
}

function Logo() {
  return(
    <h1>⛱ Far Away 🎢</h1>
  )
}

function From({setValueFromChild}) {

  const [textInput, setTextInput] = useState('');
  const [optionNum, setOptionNum] = useState('');

  function handleSumbit(e) {
    e.preventDefault()
    setValueFromChild({id: 4, description: textInput, quantity: optionNum, packed: false})
  }

  return(
    <form className="add-form" onSubmit={handleSumbit}>
      <h3>What do you need for myou trip?</h3>
      <select 
        value={optionNum}
        onChange={(e)=> setOptionNum(e.target.value)}
      >
      {Array.from({length: 20}, (_, i) => i+1).map(num => {
        return(
          <option key={num} value={num} >{num}</option>
        )
      })}
      </select>
      <input 
        name="description"
        id="input"
        placeholder="Item..."
        value={textInput}
        onChange={(e)=> setTextInput(e.target.value)}
      />
      <button  type="submit">Add</button>
    </form>
  )
}

function PackingList() {
  return(
    <div className="list" >
      <ul> 
      { initialItems.length < 0 ?'mt list': initialItems.map(el => {
          return(
            <li key={el.id}  >
              <input type="checkbox" />
              <p className={el.packed? 'checked': '' }>{el.quantity }{" "}{el.description}</p>
              <button>❌</button>
            </li>
          )
        })
      }
      </ul>
      
      <div className="actions" >
        <select>
          <option>sort by input order</option>
        </select>
        <button>clear list</button>
      </div>
    </div>
  )
}

function States() {
  return(
    <footer className="stats" >
      <h3>👜 you have 00 items on your list, and you already packed 0 (0%)</h3>
    </footer>
  )
}
