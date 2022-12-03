import React, {useState, useContext} from 'react'
import { EthersContext } from '../Context/EthersContext'
import Loader from './Loader'

function Transfer() {

    const inputStyle = "my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism w-80"

    const {transferOwner} = useContext(EthersContext)
    const handleSubmit = async()=>{
      
        if(Id==null||To==null){ 
            return(alert("Please fill both to tranfer"))}
        else{ 
            try{
                setisLoading(true)
             await transferOwner(Id, To)
             alert(`Ownership of case ${Id} has been succeffully transfered to ${To}`)
             setisLoading(false)

            }catch(e){
                alert(e)
                setisLoading(false)
            }
            
            
        }
    }
     const [Id, setId] = useState()
     const [To, setTo] = useState()
     const [isLoading, setisLoading] = useState()
  return (
    <div className='gradient-bg-welcome flex w-full min-h-screen justify-center items-center'>
         <div className="p-5  flex flex-col justify-start items-center text-left blue-glassmorphism  border-gray-400">
           <div className='text-white'> Ownership Id:</div> 
          <input placeholder="token no" className={inputStyle} type="text" onChange={(e) => { setId(e.target.value) }} />
          <div className='text-white'> To address:</div> 
          <input placeholder="To" className={inputStyle} type="text" onChange={(e) => { setTo(e.target.value) }} />

          {isLoading
                        ? <Loader/>
                        : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Proceed to transfer
                            </button>
                        )}
        </div>
    </div>
  )
}

export default Transfer