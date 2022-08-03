export default function (userDatas = null, action) {
  if (action.type === "register") {
    var userDatasCopy = action.userDatas;
    return userDatasCopy;
  } else {
    return userDatas;
  }
}
