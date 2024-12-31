import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrderThunk } from '../../features/orderSlice'
import { TextField, Button } from '@mui/material'
import { Wrap, Container } from '../../styles/input'
import { Link } from 'react-router-dom'

const Order = ({ product }) => {
   const [address, setAddress] = useState('')
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)
   const [isOrderComplete, setOrderComplete] = useState(false)

   const handleOrder = useCallback(() => {
      if (!address.trim() || !name.trim() || !phone.trim()) {
         alert('모든 데이터를 입력해주세요')
         return
      }
      const pid = product.id
      dispatch(createOrderThunk({ address, phone, name, pid }))
         .unwrap()
         .then(() => {
            setOrderComplete(true)
         })
         .catch((error) => {
            console.error('주문 에러:', error)
         })
   }, [dispatch, address, name, phone, product])

   if (isOrderComplete) {
      return (
         <Wrap>
            <Container>
               <p>주문이 완료되었습니다</p>
               <p>
                  <Link to="/">홈으로 돌아가기</Link>
               </p>
            </Container>
         </Wrap>
      )
   }

   return (
      <Wrap>
         <Container>
            <img src={`${process.env.REACT_APP_API_URL}${product.Images[0].img}`} width="300px" alt="주문상품"></img>
            <p>구매상품 : {product.title}</p>
            <p>가격 : {product.price.toLocaleString()}</p>

            <TextField label="배송지" variant="outlined" type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />

            <TextField label="수취인" variant="outlined" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

            <TextField label="연락처" variant="outlined" type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <p>결제수단 : 카드결제</p>

            <Button variant="contained" onClick={handleOrder} disabled={loading} sx={{ m: 1 }}>
               주문하기
            </Button>
         </Container>
      </Wrap>
   )
}

export default Order
