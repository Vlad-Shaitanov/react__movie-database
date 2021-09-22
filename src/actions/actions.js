export const actionCreatorUpdateAuth = (payload) => {
  return {
    type: "UPDATE_AUTH",
    payload,
  };
};

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const actionCreatorUpdateFavoriteList = (payload) => {
  return {
    type: "UPDATE_FAVORITE_LIST",
    payload,
  };
};

export const actionCreatorAddToFavoriteList = (payload) => {
  return {
    type: "ADD_TO_FAVORITE_LIST",
    payload,
  };
};

export const actionCreatorRemoveFromFavoriteList = (payload) => {
  return {
    type: "REMOVE_FROM_FAVORITE_LIST",
    payload,
  };
};

export const actionCreatorUpdateWatchList = (payload) => {
  return {
    type: "UPDATE_WATCH_LIST",
    payload,
  };
};
