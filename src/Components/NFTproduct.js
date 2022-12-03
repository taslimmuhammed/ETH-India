import '../Styles/nftproduct.css'
import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {Navigate, useNavigate} from 'react-router-dom';
import { Col, Row } from "react-bootstrap";
import { EthersContext } from "../Context/EthersContext";
import { shortenAddress } from "../Utils/ShortenAddress";

const NFTproduct = (props) => {
    return (
        <div className='card_body button-64'>
        <div className='card_text'>
            <p className="text-white font-light text-sm">
            {/* {shortenAddress(currentAccount)} */}
            </p>
            <p className='product_name'>
                {props.name}
            </p>
            <p className='product_inventor'>Inventor : {props.inventor}</p>
            <p className='product_licensee'>Licensee : {props.licensee}</p>
            <p className='product_timestamp'>{props.timestamp}</p>
        </div>
        </div>
        // <div className="flex flex-col flex-1 items-center justify-start w-full  mt-2">
        //  <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-1 eth-card .white-glassmorphism ">
        //    <div className="flex justify-between flex-col w-full h-full">
        //      {/* <div className="flex justify-between items-start">
        //        <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
        //        <SiEthereum fontSize={21} color="#fff" />
        //        </div>
        //        <BsInfoCircle fontSize={17} color="#fff" />
        //      </div> */}
        //      <div>
        //        <p className="text-white font-light text-sm">
        //          {/* {shortenAddress(currentAccount)} */}
        //        </p>
        //        <p className="text-white font-semibold text-lg mt-1">
        //          {props.name}
        //        </p>
        //        <p className="text-white">{props.inventor}</p>
        //        <p className='product_timestamp'>{props.timestamp}</p>
        //        <p className='product_licensee'>{props.licensee}</p>
        //      </div>
        //      </div>
        //  </div>
        // </div>
    );
}
 
export default NFTproduct;

//invension name
//creator name
//timestamp
//description
//license