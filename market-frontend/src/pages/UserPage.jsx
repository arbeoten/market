import UserDetail from '../components/page/UserDetail'

const UserPage = ({ isAuthenticated, user }) => {
   return (
      <>
         <UserDetail isAuthenticated={isAuthenticated} nowUser={user}></UserDetail>
      </>
   )
}

export default UserPage
