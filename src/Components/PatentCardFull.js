import '../Styles/nftproductfull.css'
const PatentCardfull = (props) => {

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
            <p className='price'>price : {props.price}</p>
            <p className='product_timestamp'>{props.timestamp}</p>
        </div>
        </div>
    );
}
 
export default PatentCardfull;