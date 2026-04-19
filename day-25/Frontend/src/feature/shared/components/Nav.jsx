import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router-dom'

const Nav = () => {


    const navigate  = useNavigate()





  return (
    <nav className='navbar'>
        <p>Insta</p>
        <button
         onClick={()=>{navigate("/create-post")}}
         
         className='button primary-button'>New Post</button>

    </nav>
  )
}

export default Nav
