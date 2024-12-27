import BoardListItem from '../components/board/BoardListItem'

const HomePage = ({ isAuthenticated, user }) => {
   return (
      <>
         <BoardListItem isAuthenticated={isAuthenticated} user={user}></BoardListItem>
      </>
   )
}

export default HomePage
