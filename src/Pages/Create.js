import React, { useState, useContext } from "react"
import { Col, Row } from "react-bootstrap";
import { Web3Storage } from "web3.storage";
import Loader from "../Components/Loader";
import { EthersContext } from "../Context/EthersContext";
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import { borderColor } from "@mui/system";
import '../Styles/Create.css'

function Create() {

   const {createCase} = useContext(EthersContext)
    async function main(){
        try{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhDRmRhYjQ2NUE4QzAwRWE0ZWE5YTMzY2Y1N0NkQzdhRmUzMTllMzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTAwNDc1MzU5NjksIm5hbWUiOiJ0ZXN0In0.H0u5Ktl7sXELTGAYxAkQRzw5uh_JHsxzJtN5mbepLhE"
        const storage = new Web3Storage({ token })
        let cid = await storage.put(Files)
        console.log(cid);
        // console.log(Files[0].name)
        // setBlocks("Hi")
        return cid;
       }catch(e){
           alert(e)
           return null;
       }

      }


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
         setIsLoading(true) 
    //   if(Name===null||Files===null||Id===null||Description===null||Type===null){
    //       return (alert("Please fill up completely "))
    //   }
    //   else{
            // setIsLoading(true)   
            //  await main()
            //  setIsLoading(false)  
    //   }
    const cid =await  main()
    if(cid){
        const count=await createCase(Name, Creator, Description, Type, cid, cat, ipid)
        if(count==null){
            alert("Sorry, faced some technichal issues please try again later")
        }
        else{alert(`Upload Succeful . Please note the Id for your case : ${count}`)}
        console.log(count)
    }
        setIsLoading(false)
    }


    return (
        <div className='gradient-bg-welcome flex w-full min-h-screen justify-center items-center'>
            <div className="container1">
            <h2>Heading</h2>
            <div className="p-5  flex flex-col justify-start items-center text-left blue-glassmorphism  border-gray-400">
               <div>
                
                <Row>
                    <Col sm={10} xs={11} md={6} lg={5}>
                    <div className="text-white w-full text-sm ">Type of proof required </div><br />
                    <div className="flex">
                        
                        <input type="radio" id="html" name="type" value="patent" onChange={(e)=>{setType(e.target.value)}}></input>
                        <label htmlFor="css " className="text-white ">Patent</label><div className="w-10"></div>
                        <input type="radio" id="css" name="type" value="copyright"  onChange={(e)=>{setType(e.target.value)}}></input>
                        <label htmlFor="css" className="text-white">CopyRight</label></div>
                    <br></br>
                    <div className="text-white w-full text-sm ">Status of registration </div><br />
                    <div className="flex">
                        
                        <input type="radio" id="html" name="type" value="patent" onChange={(e)=>{setType(e.target.value)}}></input>
                        <label htmlFor="css " className="text-white ">Registered</label><div className="w-10"></div>
                        <input type="radio" id="css" name="type" value="copyright"  onChange={(e)=>{setType(e.target.value)}}></input>
                        <label htmlFor="css" className="text-white">Unregistered</label></div>
                    <br></br>

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

                    <div className="text-white w-full text-sm mt-3">Name of your work  </div>
                    <input placeholder="Name of your work" className={inputStyle} type="text" onChange={(e) => { setName(e.target.value) }} />
                    <div className="text-white w-full text-sm mt-3">Creators name </div>
                    <input placeholder="Name of the Creator" className={inputStyle} type="text" onChange={(e) => { setCreator(e.target.value) }} />
                    <div className="text-white w-full text-sm mt-3">Category  </div>
                    <input placeholder="Category" className={inputStyle} type="text" onChange={(e) => { setCat(e.target.value) }} />
                    <div className="text-white w-full text-sm mt-3">IP ID  </div>
                    <input placeholder="IP ID" className={inputStyle} type="text" onChange={(e) => { setIpid(e.target.value) }} />
                    {/* <div className="text-white w-full text-sm mt-3">Please upload your Id proof  .</div>
                    <input placeholder="Id card Photo" className={inputStyle} type="file" onChange={(e) => { setId(e.target.files[0]) }} /> */}
                    </Col>
                    <Col  sm={8} xs={8} md={6} lg={6}>
                    <div className="text-white w-full text-sm mt-3">Give a small description of your work</div>
                    <textarea placeholder="Description" className={inputStyle} type="textfield" onChange={(e) => { setDescription(e.target.value) }} />
                    <div className="text-white w-full text-sm mt-3">Upload files (* including large documents, designs, musics, photos etc ) </div>
                    <input className={inputStyle} type="file" multiple onChange={(e) => { setFiles(e.target.files) }} />
                    <div className="h-[1px] w-full bg-gray-400 my-2" />
                    {isLoading
                        ? <Loader />
                        : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Proceed to create
                            </button>
                        )}
                        </Col>
                 
                  </Row></div>
                
                


            </div>
            </div>
        </div>
    )
}

export default Create 