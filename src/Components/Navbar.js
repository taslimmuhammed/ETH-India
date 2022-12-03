import React, {useState, useContext} from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import '../Styles/Navbar.css'
import logo from "../images/logo.png";
import { SearchContext } from "../Context/SearchContext";
import {Link, useNavigate} from 'react-router-dom';

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false);
   const navs = ["", "view","transfer", ""]
  const {proSearch, setproSearch} = useContext(SearchContext)

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      <li onClick={()=>navigate('myworks')} className="navbar_item">Your Works</li>
      <li onClick={()=>navigate('create')} className="navbar_item">Create</li>
          <li onClick={()=>navigate('transfer')} className="navbar_item">Transfer Ownership</li>
         
        <li>
          <input onChange={(e)=>setproSearch(e.target.value)} placeholder="Enter product Id" className="search-bar" ></input>
        </li>
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]" onClick={()=>navigate('/view')}>
          Search
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
            <NavBarItem  title="Your Works" classprops="my-2 text-lg"  onClick={()=>navigate('/myworks')}></NavBarItem>
            <NavBarItem  title="Create" classprops="my-2 text-lg"onClick={()=>navigate('/create')} ></NavBarItem>
            <NavBarItem  title="Transfer Ownership" classprops="my-2 text-lg" onClick={()=>navigate('transfer')} ></NavBarItem>
            <NavBarItem  title="*Open in desktop to search for products" ></NavBarItem>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
