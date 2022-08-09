export default function (userDatas = null, action) {
  if (action.type === "register") {
      let userDatasCopy = action.userDatas;
      return userDatasCopy;
  } else {
      return userDatas
    }
}

