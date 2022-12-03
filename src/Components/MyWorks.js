import React, {useEffect, useContext, useState} from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import '../Styles/MyWorks.css'
import folder from '../images/Folder-icons.png'
import { shortenAddress } from '../Utils/ShortenAddress'
import { EthersContext } from '../Context/EthersContext'
import { SearchContext } from '../Context/SearchContext'
import {Link, useNavigate} from 'react-router-dom';

function MyWorks() {
    const {getMyWorks} = useContext(EthersContext)
    const {proSearch, setproSearch} = useContext(SearchContext)
    const [Works, setWorks] = useState()
    const navigate = useNavigate()
    
    const getter=async() => {
      let works = await getMyWorks()
       setWorks(works)
       console.log(works)
     }
    useEffect(() => {
     getter()
    }, [])
    
  return (
    <div  className='gradient-bg-welcome works_main'>

   <h1 className='text-violet-600 italic mt-5 ml-5'>Your Ownings </h1>
       <Table striped bordered hover variant="dark" className='tb_1'>
  <thead>
    <tr>
      <th>#</th>
      <th>Address</th>
    </tr>
  </thead>
  <tbody>
    {
      Works?
       Works.map((e, index)=>(
        <tr key={index}>
        <td>{index+1}</td>
        <td className='link' onClick={()=>{
          setproSearch(e)
          navigate('/view')
        }}>{e}</td>
      </tr>)
       ):
         <tr>
         <td>1</td>
         <td></td>
       </tr>
    }
    
  </tbody>
</Table>
    </div>
  )
}

export default MyWorks