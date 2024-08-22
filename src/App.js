const {useState} = require('react')

export default function App() {

  const [itemsList, setItemsList] = useState([])

  function sendDataToParent(item) {
    setItemsList([...itemsList, item])
  }

  function handlDataFromChild(targetId) {
    setItemsList(targetId)
  }

  function elementToDelete(item) {
    setItemsList(itemsList.filter((el) => el !== item))
  }

  function clearAll() {
    setItemsList([])
  }

  function selectedItem(option) {
    if (option === 'defulat') return;
    if (option === 'description') {
      console.log(itemsList.map(a => a.description).sort(a, b=> a-b))
      // console.log(itemsList.sort((a, b) => a.description - b.description));
    }
  } 

  function handlUpdateItem(id) {
    setItemsList(itemsList.map(el => el.id === id? {...el, packed: !el.packed}: el));
  }
 
  return( 
    <div className="app">
      <Logo/>
      <From onAddItem={sendDataToParent} />
      <PackingList 
        itemsList={itemsList}
        elementToDelete={elementToDelete} 
        handlDataFromChildChild={handlDataFromChild}
        clearAll={clearAll}
        upDateElement={handlUpdateItem}
        selectedItem={selectedItem}
      />
      <States
        itemsList={itemsList}
      />
    </div>
  )
}

function Logo() {
  return(
    <h1>🏝️ Far Away 🏖️</h1>
  )
}

function From({onAddItem}) {

  const [textInput, setTextInput] = useState('');
  const [optionNum, setOptionNum] = useState(1);

  function handleSumbit(e) {
    e.preventDefault()

    if(!textInput) return
    // let id = 
    const data = {id: Math.random(), description: textInput, quantity: +optionNum, packed: false}

    onAddItem(data)

    setOptionNum(1)
    setTextInput('')
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
      <button type="submit">Add</button>
    </form>
  )
}

function PackingList({itemsList, elementToDelete, clearAll, upDateElement, selectedItem}) {

  function deletedItemById(id) {
    const currn = itemsList.find((el) => el.id === id)
    elementToDelete(currn)
  }

  function onUpdate(id) {
    // const currn = itemsList.find((el) => el.id === id)
    upDateElement(id)
  }

  function clear() {
    clearAll()
  }

  function onOptionChangeHandler(e) {
    selectedItem(e.target.value)
  }

  return(
    <div className="list"  >
      <ul> {itemsList.map((itemsList) => <Item onUpdate={onUpdate} deletedItemById={deletedItemById} key={Math.random()} itesm={itemsList} />)}
      </ul>    
      <div className="actions" >
        <select name="select"  onChange={onOptionChangeHandler} >
          <option value="defulat">sort by input order</option>
          <option value="description" >sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={clear}>clear list</button>
      </div>
    </div>
  )
}

function Item({itesm, deletedItemById ,onUpdate}) {

  // const [checked, setChecked] = useState(false);

  function deleteItem(targetId) {
    deletedItemById(targetId)
  }

  function updateItem(id) {
    onUpdate(id)
  }

  return(
    <li key={Math.random()* 10} id={itesm.id}>
      <input 
        type="checkbox"
        value={itesm.packed}
        onChange={(e) => updateItem(itesm.id)}
      />
      <p className={itesm.packed ? 'checked': ''}>{itesm.quantity }{" "}{itesm.description}</p>
      <button onClick={()=> deleteItem(itesm.id)} >❌</button>
    </li>
  )
}

function States({itemsList}) {
  if (itemsList.length === 0) {
    return(
      <footer className='stats' >
        <h3>Start adding some items to your packing list 👜</h3>
      </footer>
    )
  }

  const getLenOfItems = itemsList.length;
  const alreadyPacked = itemsList.filter((el)=> el.packed).length
  const parst = Math.floor((alreadyPacked / getLenOfItems) * 100);

  return(
    <footer className="stats" >
      <h3>
        {
          parst === 100 ? 
            "You got everything! Ready to go 🚗 ": 
            `👜 you have ${getLenOfItems} items on your list, and you already packed ${alreadyPacked} (${parst}%)`
        }
        </h3>
    </footer>
  )
}

