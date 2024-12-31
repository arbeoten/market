import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

// axios 인스턴스 생성
const marketApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true, // 세션 쿠키를 요청에 포함
})

// auth
// 회원가입
export const registerUser = async (userData) => {
   try {
      const response = await marketApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 로그인
export const loginUser = async (credentials) => {
   try {
      const response = await marketApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await marketApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 로그인 상태확인
export const checkAuthStatus = async () => {
   try {
      const response = await marketApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// board
// 게시물 등록
export const createProduct = async (productData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await marketApi.post('/board', productData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 게시물 호출
export const getProducts = async ({ page, keyword }) => {
   try {
      const response = await marketApi.get(`/board?page=${page}&keyword=${keyword}`)
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

// 특정 게시물 가져오기
export const getProductById = async (id) => {
   try {
      const response = await marketApi.get(`/board/${id}`) // api 통신
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

// 게시물 삭제
export const deleteProduct = async (id) => {
   try {
      const response = await marketApi.delete(`/board/${id}`) // api 통신
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

// 게시물 수정
export const updateProduct = async (id, productData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await marketApi.put(`/board/${id}`, productData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// order
// 주문등록
export const createOrder = async (orderData) => {
   try {
      const response = await marketApi.post('/order', orderData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 주문확인
export const checkOrder = async (id) => {
   try {
      const response = await marketApi.patch(`/order/check/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 발송완료
export const sendOrder = async (id) => {
   try {
      const response = await marketApi.patch(`/order/send/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 수령완료
export const receiveOrder = async (id) => {
   try {
      const response = await marketApi.patch(`/order/receive/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// user
// 유저 검색
export const getUserById = async (id) => {
   try {
      const response = await marketApi.get(`/user/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 판매목록
export const sellProductByUserId = async ({ page, id }) => {
   try {
      const response = await marketApi.get(`/user/${id}/sell?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 구매목록
export const buyProductByUserId = async ({ page, id }) => {
   try {
      const response = await marketApi.get(`/user/${id}/buy?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
