

const App = () => {

  let  a = 10

  const handleclick=()=>{
    a++
    console.log(a);
    
  }
  return (
  <>  <div>App</div>
  <h1>{a}</h1>
  <button onClick={handleclick}>click</button></>

  )
}

export default App