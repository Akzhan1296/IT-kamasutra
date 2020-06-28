import React from "react";
import {connect} from "react-redux";
import {follow, unfollow, setCurrentPage,getUsersThunkCreator} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


class UsersContainer extends React.Component {
    componentDidMount() {
      this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }
  
    onPageChanged = (pageNumber) => {

      this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
      this.props.setCurrentPage(pageNumber);
    };
  
    render() {
      return <>
        {this.props.isFetching ? <Preloader/> : null}
            <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}  
            currentPage={this.props.currentPage}
            selectedPage={this.props.selectedPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            
            followingInProgress={this.props.followingInProgress}
            />
        </>

    }
  }


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users, 
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
//mapStateToProps сама делает запрос к store получает state и subscribe

// let mapDispatchToProps = (dispatch) => {
//     return {
//          follow: (userId) => {
//             dispatch(followAC(userId));
//          },
//          unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//          },
//          setUsers: (users) => {
//              dispatch(setUsersAC(users));
//              //отправляет данные в setUSersAc
//              //в users-reducer setUsrs(actionCreator) возвращает новый объект с данными из сервера 
//             //Итого диспачется новый объект и попадаем в reducer
//             },
//             setCurrentPage: (pageNumber) => {
//                 dispatch(setCurrentPageAC(pageNumber))
//             },
//             setTotalUsersCount: (totalCount) => {
//                 dispatch(setTotalUsersCountAC(totalCount))
//             },
//             toggleIsFetchingAC: (isFetching) => {
//                 dispatch(toggleIsFetchingAC(isFetching))
//             }
//     }
// }
export default compose(
  connect(mapStateToProps,{
    follow,
    unfollow,
    setCurrentPage,
    getUsersThunkCreator //находится в reducer 
}),
  
)(UsersContainer);

//ДО COMPOSE
// let withRedirect = withAuthRedirect(UsersContainer);
// export default connect(mapStateToProps,{
//     follow,
//     unfollow,
//     setCurrentPage,
//     getUsersThunkCreator
// })(withRedirect);

// второй способ обявления mapDisptachToProps 
//сама создаем callback и делает dispatch  