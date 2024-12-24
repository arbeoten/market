import BoardListItem from '../components/board/BoardListItem'

const HomePage = ({ isAuthenticated, user }) => {
   return (
      <>
         <hr></hr>
         <BoardListItem isAuthenticated={isAuthenticated} user={user}></BoardListItem>
         <hr></hr>
      </>
   )
}

export default HomePage
