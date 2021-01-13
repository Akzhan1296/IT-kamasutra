import React from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";

import { UserType } from "../../types/types";

import {
  follow,
  unfollow,
  //setCurrentPage,
  getUsersThunkCreator,
  FilterType,
} from "../../redux/users-reducer";

import {
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  getUsersSuperSelector,
  getUsersFilter,
} from "../../redux/users-selectors";

import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { compose } from "redux";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type MapDispatchPropsType = {
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  //setCurrentPage: (pageNumber: number) => void;
  getUsersThunkCreator: (
    currentPage: number,
    pageSize: number,
    term: string
  ) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    let { currentPage, pageSize } = this.props;
    this.props.getUsersThunkCreator(currentPage, pageSize, "");
  }

  onPageChanged = (pageNumber: number) => {
    let { pageSize, filter } = this.props;
    this.props.getUsersThunkCreator(pageNumber, pageSize, filter.term);
    //this.props.setCurrentPage(pageNumber);
  };

  onFilterChanged = (filter: FilterType) => {
    let { pageSize } = this.props;
    this.props.getUsersThunkCreator(1, pageSize, filter.term);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    // users: getUsers(state),
    users: getUsersSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
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
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      follow,
      unfollow,
      //setCurrentPage,
      getUsersThunkCreator, //находится в reducer
    }
  )
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
