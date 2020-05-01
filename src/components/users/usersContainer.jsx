import React from "react";
import * as axios from "axios";
import { connect } from "react-redux";
import {followAC, unfollowAC, setUsersAC,setCurrentPageAC,setTotalUsersCountAC,toggleIsFetchingAC} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader"

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetchingAC(true);
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page${this.props.currentPage}&count=${this.props.pageSize}`,{
            withCredentials: true,
          }
        )
        .then((response) => {
          this.props.toggleIsFetchingAC(false);
          this.props.setUsers(response.data.items);
          this.props.setTotalUsersCount(response.data.totalCount);
          //мы задаем данные из api в setusers
        });
    }
  
    onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber);
      this.props.toggleIsFetchingAC(true);
      axios
        .get(
          `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,{
            withCredentials: true,
          }
        )
        .then((response) => {
          this.props.setUsers(response.data.items);
          //мы задаем данные из api в setusers
          this.props.toggleIsFetchingAC(false);
        });
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
        isFetching: state.usersPage.isFetching
    }
}

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

export default connect(mapStateToProps,{
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    toggleIsFetchingAC: toggleIsFetchingAC
})(UsersContainer);
