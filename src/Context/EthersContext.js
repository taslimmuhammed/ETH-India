import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";
import SocialLogin, { getSocialLoginSDK } from "@biconomy/web3-auth";

export const EthersContext = createContext(null);

const { ethereum } = window
let signer = null
let contract = null
const socialLoginSDK = new SocialLogin();
let provider = null
export default function Ethers({ children }) {

  const contractAddress = "0xa39cb7641277711be2C9F7B4ca085a8193361c74"
  const [currentAccount, setCurrentAccount] = useState(null);
  const [N, setN] = useState();
const [SContent, setSContent] = useState([])
  const checkIfWalletIsConnect = async () => {
    try {
      await socialLoginSDK.init('0x89'); // Enter the network id in hex) parameter
      if (!socialLoginSDK?.web3auth?.provider) {
        alert("Please sign in using to countinue")
        socialLoginSDK.showConnectModal()
        socialLoginSDK.showWallet()
        return;
      } else {
        console.log(socialLoginSDK.web3auth.provider)
      }
      provider = new ethers.providers.Web3Provider(
        socialLoginSDK.web3auth.provider,
      );
       signer = provider.getSigner()
       contract = new ethers.Contract(contractAddress, abi, signer)
      const accounts = await provider.listAccounts();
      console.log("EOA address", accounts)
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      // if (!ethereum) return alert("Please install MetaMask.");

      // const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      // setCurrentAccount(accounts[0]);
      // window.location.reload();
      await socialLoginSDK.init('0x89'); 
      alert("Please sign in using to countinue")
        socialLoginSDK.showConnectModal()
        socialLoginSDK.showWallet()
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const createCase = async (name, creator, description, type, uri, cat, ipid) => {
    try {

      const { ethereum } = window
      // const provider = new ethers.providers.Web3Provider(ethereum)
      // const signer = provider.getSigner()
      // const contract = new ethers.Contract(contractAddress, abi, signer)

      // const created = await contract.safeMint(account, name, creator ,description,type, uri )
      // const counter = await contract.counter()
      const z = await contract.safeMint(currentAccount, name, creator, description, type, uri, cat, ipid)
      let x = await z.wait()
      console.log(z)
      const count = await contract.getCount()
      return count


    } catch (e) {
      console.log(e)
    }

  }


  const getUri = async (uri) => {
    try {
      const { ethereum } = window
      // const provider = new ethers.providers.Web3Provider(ethereum)
      // const signer = provider.getSigner()
      // const contract = new ethers.Contract(contractAddress, abi, signer)
      const URI = await contract.tokenUris(uri)
      return (URI)
    }
    catch (e) {
      console.log(e)
    }
  }

  const getOwner = async (tokenId) => {
    const { ethereum } = window
    // const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const ownerAddress = await contract.owner(tokenId)
    return ownerAddress
  }

  const transferOwner = async (tokenId, to) => {   
    const transfer = await contract.transfer(tokenId, to)
    return transfer
  }

  

  const getAllprojectNos =async()=>{
    const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
       const contract = new ethers.Contract(contractAddress, abi,signer)
    let count = await contract.getCount()
    count  =  parseInt(count._hex, 16)
    let output = []
    for(let i=3135995787;i<=count ;i++){
     let box =await contract.getCard(i)
     let time =  parseInt(box.timeStamp._hex, 16)
     var date = new window.Date(time);
      console.log(date)
     let D =  date.getDate()+
     "/"+(date.getMonth()+1)+
     "/"+date.getFullYear()
    //  let T = " "+date.getHours()+
    //  ":"+date.getMinutes()+
    //  ":"+date.getSeconds()
     let newB = {
      id:i,
      name:box.name,
      Creator:box.Creator,
      Type:box.Type,
      category:box.category,
      ipid:box.ipid,
      timeStamp:D,
      lender:box.lender,
      owner:box.owner
     }
     output.push(newB)
    }
      console.log(output)
      return output
  }

  const getSearchContents =async()=>{
    const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
       const contract = new ethers.Contract(contractAddress, abi,signer)
    let count = await contract.getCount()
    count  =  parseInt(count._hex, 16)
    let output = []
    for(let i=3135995787;i<=count ;i++){
     let box =await contract.getCard(i)
     let newB = {
      id:i,
      name:box.name,
      Creator:box.Creator,
      category:box.category,
      ipid:box.ipid,
     }
     output.push(newB)
     setSContent(newB)
    }
      console.log(output)
      return output
  }

  const getMyWorks = async () => {
    try {

      const { ethereum } = window
      // const provider = new ethers.providers.Web3Provider(ethereum)
      // const signer = provider.getSigner()
      // const contract = new ethers.Contract(contractAddress, abi, signer)
      const accounts = await ethereum.request({ method: "eth_accounts" })
      const account = accounts[0]
      const myIds = await contract.getTokens(account)
      const getNames = myIds.map(e => {
        return parseInt(e._hex, 16)
      })
      return getNames
    } catch (e) {
      console.log(e)
    }

  }

  // const changeNetwork = async () => {
  //   if (window.ethereum) {
  //     try {
  //       await window.ethereum.request({
  //       method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: "0x89" }],
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }}

  const getN = async () => {
    const chainId = 137 // Polygon Mainnet

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: "0x89" }]
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Polygon Mainnet',
                chainId: "0x89",
                nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                rpcUrls: ['https://polygon-rpc.com/']
              }
            ]
          });
        }
      }
    }

  }

  useEffect(() => {
    checkIfWalletIsConnect();
    // changeNetwork()
    getN()
    getAllprojectNos()
  }, []);


  return (
    <EthersContext.Provider value={{ connectWallet, currentAccount, checkIfWalletIsConnect, createCase, getUri, getOwner, transferOwner, getMyWorks,getAllprojectNos }}>
      {children}
    </EthersContext.Provider>
  )
}
