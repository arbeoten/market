import { Link } from 'react-router-dom'

const Footer = ({ isAuthenticated, user }) => {
   return (
      <>
         <div style={{ borderTop: '1px solid silver', display: 'flex', justifyContent: 'center', fontSize: '0.9em', paddingTop: '8px', marginTop: '8px' }}>
            <div style={{ margin: '8px' }}>
               <p>중고장터(주) 사업자정보</p>
               <p>대표이사 : 홍길동</p>
               <p>사업자등록번호 : 000-00-000000</p>
               <p>EMAIL : aaa@test.com</p>
            </div>
            <div style={{ margin: '8px' }}>
               <p>고객센터</p>
               <p>0000-0000</p>
               <p>운영시간 9시 ~ 18시 (주말/공휴일 휴무, 점심시간 13시~14시)</p>
               <p>공지사항 1:1문의 자주묻는질문</p>
            </div>
         </div>
         {user?.id === 1 && (
            <p style={{ textAlign: 'center', margin: '20px 0' }}>
               <Link style={{ color: 'red' }} to="/admin">
                  관리자 페이지
               </Link>
            </p>
         )}
      </>
   )
}

export default Footer
