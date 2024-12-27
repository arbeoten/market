import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrderThunk } from '../../features/orderSlice'

const Order = ({ product }) => {
   const [address, setAddress] = useState('')
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   const handleOrder = useCallback(() => {
      if (!address.trim() || !name.trim() || !phone.trim()) {
         alert('모든 데이터를 입력해주세요')
         return
      }
      const pid = product.id
      dispatch(createOrderThunk({ address, phone, name, pid }))
         .unwrap()
         .then(() => {
            window.location.href = '/'
         })
         .catch((error) => {
            console.error('주문 에러:', error)
         })
   })

   return (
      <>
         <img src={`${process.env.REACT_APP_API_URL}${product.Images[0].img}`}></img>
         <p>구매상품 : {product.title}</p>
         <p>가격 : {product.price.toLocaleString()}</p>
         <hr></hr>
         <p>배송지</p>
         <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
         <p>수취인</p>
         <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
         <p>연락처</p>
         <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
         <button onClick={handleOrder} disabled={loading}>
            주문하기
         </button>
      </>
   )
}

export default Order
