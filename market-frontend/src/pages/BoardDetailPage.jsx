import BoardDetail from '../components/board/BoardDetail'

const BoardDetailPage = ({ isAuthenticated, user }) => {
   return (
      <>
         <BoardDetail isAuthenticated={isAuthenticated} user={user}></BoardDetail>
      </>
   )
}

export default BoardDetailPage
