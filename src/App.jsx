import { useState } from 'react'
import Card from './card.jsx'
import View from './view.jsx'
import Cart from './cart.jsx'
import Buy from './buy.jsx'
import Signin from './sighin.jsx'
import Payment from "./payment.jsx";
import Form from './form.jsx'
import Cacc from './form.jsx'
import Home from "./home.jsx"
import About from './About.jsx'
// import CreateAccount from './createac.jsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/shop" element={<Card />} />
         <Route path="/about" element={<About />} />
         <Route path="/view/:id" element={<View />} />
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/buy" element={<Buy/>}/>
         <Route path="/sign" element={<Signin />} />
         <Route path="/payment" element={<Payment />} />
         <Route path="/account" element={<Cacc/>} />
          <Route path="/form" element={<Form/>} />
      </Routes>
     
    </>
  )
}
export default App