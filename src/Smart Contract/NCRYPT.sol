// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract NCrypt {
    uint counter;
    constructor(){
        counter= 3135995786;
    } 
    
     mapping(uint256=> URI) public  tokenUris;
     mapping (uint256=> address) public owner;
     mapping(address => uint256[]) public ownings; 
     event Minted(uint256 tokenId, string  owner);
     uint[]  public  marketList;
    struct URI{
        string name;//
        string Creator;//
        string description;
        string Type;//
        string category;//
        string ipid;//
        string url;
        uint timeStamp; //  
    }
   struct marketStruct{
        string name;//
        string Creator;//
        string Type;//
        string category;//
        string ipid;//
        uint timeStamp; //
        address currentOwner;
   }
 
    struct lendStruct{
        uint endDate;
        uint256 minDate;
        address currentUser;
    }
   
   mapping(uint256=>lendStruct)public lendMap;
   mapping(address=>uint256[])public lendList;
   mapping(uint256=>address)public requesteduser;
   mapping(uint256=>uint256)public requestedDays;
   mapping(uint256=>bool)public isLending;
   mapping(address=>uint256)public userRequestList;
   mapping(uint256=>uint256)public lendPrice;
   

   function getSearchData ()public view returns( marketStruct[] memory) {
       marketStruct[] memory list = new marketStruct[](counter-3135995786);
       for(uint256 i=3135995787;i<=counter;i++){
           URI memory tempo = tokenUris[i];
           address current = lendMap[i].currentUser;
         list[i-3135995786]= marketStruct(tempo.name,tempo.Creator,tempo.Type,tempo.category,tempo.ipid,tempo.timeStamp,current);
       }
       return list;
   }


function getMarketList() public view returns(uint256[] memory){
       return marketList;
}

function getCard(uint256 count)public view returns(marketStruct memory){
     URI memory tempo = tokenUris[count];
        address current = lendMap[count].currentUser;
    return marketStruct(tempo.name,tempo.Creator,tempo.Type,tempo.category,tempo.ipid,tempo.timeStamp,current);
}


   function getMarketPlaceData ()public view returns( marketStruct[] memory) {
       uint256 z = marketList.length;
       marketStruct[] memory list = new marketStruct[](z);
       for(uint256 i=0;i<z;i++){
           uint256 tokenId = marketList[i];
           URI memory tempo = tokenUris[tokenId];
           address current = lendMap[tokenId].currentUser;
           list[i]=marketStruct(tempo.name,tempo.Creator,tempo.Type,tempo.category,tempo.ipid,tempo.timeStamp,current);
       }
       return list;
   }

   function releaseToMarket(uint256 tokenId, uint256 minDays ,uint256 price)public{
      require(owner[tokenId]==msg.sender, "Only true owner can transfer patents");
       lendMap[tokenId] = lendStruct(0,minDays,0x0000000000000000000000000000000000000000);
       isLending[tokenId]= true;
       lendPrice[tokenId]= price;
       marketList.push(tokenId);
   }
   function requestLend(uint256 tokenId, uint256 DAYS )public  payable{
       require(msg.value >= DAYS*lendPrice[tokenId] , "please pay the right amount");
       require(isLending[tokenId],"The owner doess not wish to lend the work for now");
       require(DAYS>lendMap[tokenId].minDate , "min no of days must be grter than the the goiven date");
       requesteduser[tokenId]= msg.sender;
       requestedDays[tokenId] = DAYS;
       lendList[msg.sender].push(tokenId);
   }
  

  function acceptLend(uint256 tokenId, bool isAccpted) public{
        require(owner[tokenId]==msg.sender, "Only true owner can lend");
        if(!isAccpted){
            payable(requesteduser[tokenId]).transfer(requestedDays[tokenId]*lendPrice[tokenId]);
            requesteduser[tokenId]=0x0000000000000000000000000000000000000000;
           
        }else{
           lendMap[tokenId].currentUser = requesteduser[tokenId];
           lendMap[tokenId].endDate = requestedDays[tokenId]*86400+block.timestamp;
        }
  }

    function getCount() public view returns(uint256){
        return counter;
    }
     function safeMint(address to, string memory name,string memory _owner, string memory description, string memory Type, string memory url,string memory category, string memory ipid) public returns(uint256){
          counter = counter+1;
          uint256 count = counter;
          owner[count]= to;
          tokenUris[count]=  URI( name,_owner, description, Type,category,ipid, url, block.timestamp);
          ownings[to].push(count);
          emit Minted(count, _owner);
          return count;
     } 
    
     function burn(uint256 _tokenId) public returns (bool){
         require(owner[_tokenId]==msg.sender, "Only true owner can transfer patents");
          delete owner[_tokenId] ;
          for(uint j = 0; j < ownings[msg.sender].length; j++){
              if(ownings[msg.sender][j]==_tokenId){
                  delete ownings[msg.sender][j];
              }
          }
          delete tokenUris[counter]; 
          return true;  
     }

     function transfer(uint256 tokenId, address to) public  returns(bool){
         require(owner[tokenId]==msg.sender, "Only true owner can transfer patents");
         owner[tokenId]= to;
            for(uint j = 0; j < ownings[msg.sender].length; j++){
              if(ownings[msg.sender][j]==tokenId){
                  delete ownings[msg.sender][j];
              }
          }
          ownings[to].push(tokenId);
         return true ; 
     }

   

      function getTokens(address ownerAddress) public view returns( uint256[] memory){
        return ownings[ownerAddress];
    }

}
