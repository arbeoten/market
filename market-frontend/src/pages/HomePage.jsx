import BoardListItem from '../components/board/BoardListItem'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const HomePage = ({ isAuthenticated, user }) => {
   return (
      <>
         <div style={{ width: '960px', margin: '0 auto' }}>
            <Swiper
               spaceBetween={30}
               centeredSlides={true}
               autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
               }}
               pagination={{
                  clickable: true,
               }}
               modules={[Autoplay, Pagination]}
               className="mySwiper"
            >
               <SwiperSlide>
                  <img src="/images/banner1.webp" alt="1" width={'960px'} style={{ textAlign: 'center' }} />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/images/banner2.webp" alt="2" width={'960px'} />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/images/banner3.webp" alt="3" width={'960px'} />
               </SwiperSlide>
               <SwiperSlide>
                  <img src="/images/banner4.webp" alt="4" width={'960px'} />
               </SwiperSlide>
            </Swiper>
         </div>
         <BoardListItem isAuthenticated={isAuthenticated} user={user}></BoardListItem>
      </>
   )
}

export default HomePage
