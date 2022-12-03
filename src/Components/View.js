import React, {useContext, useEffect, useState} from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import "../Styles/View.css"
import Navbar from './Navbar';
import fileImage from '../images/File.png'
import { shortenAddress } from '../Utils/ShortenAddress';
import { SearchContext } from '../Context/SearchContext';
import { EthersContext } from '../Context/EthersContext';
import { Web3Storage } from "web3.storage";
import Loader from "../Components/Loader";

function View() {
    
       const {proSearch, setproSearch} = useContext(SearchContext)
       const {getUri, getOwner} = useContext(EthersContext)
       const [Uri, setUri] = useState({name:"", Creator:"",Type:""})
        const [Files, setFiles] = useState()
        const [owner, setowner] = useState("")
        const [TimeStamp, setTimeStamp] = useState()
        const [Time, setTime] = useState("")
        const [Date, setDate] = useState("")
       const getDetails =async ()=>{
           let  struct = await getUri(proSearch)
           let t  = parseInt(struct.timeStamp._hex, 16)
           setTimeStamp(t)
           setUri(struct)
           getFileData(struct.url)
           //setowner(getOwner(proSearch))
           const own = await getOwner(proSearch)
           setowner(own)
       }

       const getFileData = async (uri)=>{
           try{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhDRmRhYjQ2NUE4QzAwRWE0ZWE5YTMzY2Y1N0NkQzdhRmUzMTllMzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTAwNDc1MzU5NjksIm5hbWUiOiJ0ZXN0In0.H0u5Ktl7sXELTGAYxAkQRzw5uh_JHsxzJtN5mbepLhE"
            const storage = new Web3Storage({ token })
            const res = await storage.get(uri)
            const files = await res.files()
            setFiles(files)
            console.log(files)
           }catch(e){}
       
       }
    useEffect(() => {
        getDetails()
        
    }, [])

    useEffect(() => {
      if(Uri.Creator!==""){
          const timestamp  = TimeStamp
          console.log(timestamp)
          var date = new window.Date(timestamp);
           console.log(date)
          let D =  date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()
          let T = " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds()
          setDate(D)
          setTime(T)
      }
    }, [TimeStamp])
    

    return (
        <div>

            <div className='gradient-bg-welcome flex w-full min-h-screen justify-center items-center'>
                {/* <Navbar></Navbar> */}
                <div className='view_main '>
                    <div className='view_top'>
                        Order No . {proSearch? proSearch: "Not defined"}
                    </div>

                    <div className='view_middle'>


                        <div className='view_details blue-glassmorphism '>

                            <div className='flex '>
                                <div className='content_main'>
                                    <div>Name of Project : </div>
                                    <div>Owner : </div>
                                    <div>Name of Creator : </div>
                                    <div>Date : </div>
                                    <div>Time : </div>
                                    <div>No of Files : </div>
                                    <div>Type of Proof : </div>
                                </div>
                                <div className='content_sub  italic'>
                                    <div>{Uri.name}</div>
                                    <div>{shortenAddress(owner)}</div>
                                    <div>{Uri.Creator}</div>
                                    <div>{Date}</div>
                                    <div>{Time}</div>
                                    <div>{Files?Files.length:"0"}</div>
                                    <div>{Uri.Type}</div>
                                </div>
                            </div>

                        </div>

                     
                        <div className='view_files'>
                            <div className='file_heading'>Uploaded files: </div>
                              <Row className='files_main text-white '>
                                  {Files?Files.map((e, index)=>{
                                      return( <Col lg={3} md={3} sm={3} xs={4} key={index}>
                                      <a href={`https://ipfs.io/ipfs/${Uri.url}/${e.name}`}  target="_blank">
                                      <div className='file'>
                                      <img src={fileImage} className="file_image"></img>
                                      <div>{shortenAddress(e.name)}</div>
                                  </div>
                                  </a>
                                  </Col>)
                                  }):<div className="text-white ">Nothing found</div>}
                                 
                              </Row>

                        </div>

                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default View