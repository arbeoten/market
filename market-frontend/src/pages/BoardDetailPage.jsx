import BoardDetail from '../components/board/BoardDetail'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// !!!!!작성중
const BoardDetailPage = ({ isAuthenticated, user }) => {
   const slides = () => {
      return <></>
   }
   return (
      <>
         <Swiper
            pagination={{
               type: 'fraction',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
         >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
         </Swiper>
         <BoardDetail isAuthenticated={isAuthenticated} user={user}></BoardDetail>
      </>
   )
}

export default BoardDetailPage
