import React, { useState, useContext } from "react"
import { Col, Row } from "react-bootstrap";
import { Web3Storage } from "web3.storage";
import Loader from "./Loader";
import { EthersContext } from "../Context/EthersContext";
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import { borderColor } from "@mui/system";
import '../Styles/Create.css'
const Form = () => {

    const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
    const inputStyle = "my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    const [Name, setName] = useState(null)
    const [Files, setFiles] = useState(null)
    const [Description, setDescription] = useState(null)
    const [Type, setType] = useState("patent")
    const [isLoading, setIsLoading] = useState(false)
    const [Creator, setCreator] = useState(null)
    const [cat,setCat] = useState(null);
    const [ipid,setIpid] = useState(null);

    const handleSubmit =async () => {
        console.log("hello");
   }

    return (
        <div className="p-5  flex flex-col justify-start items-center text-left blue-glassmorphism  border-gray-400 m-8">
               <div>
                
                    <Row>
                    
                    

                    {/* <TextField 
                        fullWidth
                        defaultValue=''
                        select
                        label="Category"
                        onChange={(e)=>setCat(e.target.value)}>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                    </TextField> */}

                    <div className="text-white w-full text-sm mt-3">Enter the duration  </div>
                    <input placeholder="in days" className={inputStyle} type="text" onChange={(e) => { setName(e.target.value) }} />

                    <div className="h-[1px] w-full bg-gray-400 my-2" />
                    {isLoading
                        ? <Loader />
                        : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                PURCHASE
                            </button>
                        )}
                        
                        <div className="text-white w-full text-sm items-center mt-3">*By purchasing you agree to the Terms and conditions of the license.</div>
                  </Row>
                </div>
            </div>
    );
}
 
export default Form;