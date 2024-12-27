import { useLocation } from 'react-router-dom'
import Order from '../components/board/Order'

const OrderPage = () => {
   const product = useLocation().state?.product
   return <>{product ? <Order product={product}></Order> : <p>잘못된 접근입니다.</p>}</>
}

export default OrderPage
