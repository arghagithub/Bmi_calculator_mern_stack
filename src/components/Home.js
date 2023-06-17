import React from 'react'
import Datas from './Datas'

const Home = (props) => {
  const {showalert}=props;
  return (
    <div className='container'>
      <Datas showalert={showalert} />
    </div>
  )
}

export default Home
