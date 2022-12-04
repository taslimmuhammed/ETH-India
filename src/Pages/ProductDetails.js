import NFTproduct from "../Components/NFTproduct";
import '../Styles/productDetails.css';
import PatentCardfull from "../Components/PatentCardFull";
import { Chat } from "@pushprotocol/uiweb";
import { useContext, useState, useEffect } from "react";
import {Navigate, useNavigate} from 'react-router-dom';

// import { useState, useEffect,useContext } from "react";
// import {Link, useNavigate} from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';
import Form from "../Components/Form";
import { EthersContext } from "../Context/EthersContext";
const MarketPlace = () => {
    const [Data, setData] = useState([])
    const {Sell, getProSellDetails} = useContext(EthersContext)
    const navigate = useNavigate()
    const initiator = async()=>{
        if(Sell==null) navigate("/")
        else{
            let data  =await getProSellDetails(Sell)
            setData(data)
        }
    } 
   useEffect(() => {
     initiator()
   }, [])
    // const navigate = useNavigate()
    // const {id,setId} = useContext(AuthContext);
    // const handleId = (id) =>{
    //     setId(id);
    //     navigate('productdata');
    //   }    
    return (
        <div className='gradient-bg-welcome flex w-full min-h-screen justify-center items-center'>
            <div className="productDetails_container">
           
                {
                    Data&& 
                    Data.isSelling? <div className="fullDetails"><PatentCardfull name={Data.name} licensee={Data.Creator} inventor={Data.Creator} timestamp={Data.timeStamp} price={Data.price} description={Data.description} isSellign={Data.isSelling}></PatentCardfull><div className="form_container">
                    <Form/>
    
                    </div>     </div>

                    :<h1>The owner does not wish to share his patent As of now</h1>
                }
                
            
            </div>
            <Chat
            account="0x6430C47973FA053fc8F055e7935EC6C2271D5174" //user address
            supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
            apiKey="kD0sm54zn7.IfNlbRZoKJslR6Y7lUejvqKfOvze4LrVUpI9vk2LJjZQFwBDeWThU0c6dO53ZzSu"
                env="staging"
            />
        </div>

    );
}
 
export default MarketPlace;