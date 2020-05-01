const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false 
};

const usersReducer = (state = initialState, action) => {
  //каждому reducer приходит свой кусочек state
  console.log(action);
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
            //из за того что иммутабельно взяли копию элемента массива
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            //остановился здесь

            return { ...u, followed: false };
            //из за того что иммутабельно взяли копию элемента массива
          }
          return u;
        }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };
      case TOGGLE_IS_FETCHING:
        return {
          ...state,
          isFetching: action.isFetching,
        };
    default:
      return state;
  }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage}); //current=> current:currentPage
export const setTotalUsersCountAC = (totalUsersCount) => ({type: SET_TOTAL_COUNT, count: totalUsersCount}); // type: SET_TOTAL_COUNT, count:totalUsersCount
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching }); //isFetching:true

export default usersReducer;
