import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import "./index.css"
export default function NotificationCard(props){
    const navigate=useNavigate();
    function naviagtor(){
          navigate(`/product-detail/${props.productId}/${props.brandName}/${1}`);
    }
    return(
        <div className="notification-ads-container">
            <img onClick={naviagtor}src={props.image} alt="ad image" />
            <div onClick={naviagtor}>
                <h6>{props.brandName}</h6>
                <p>{props.productTitle}</p>
            </div>
            <div onClick={props.CloseFun}>
                <CloseIcon className='close-add'/>
            </div>
        </div>
    )
}