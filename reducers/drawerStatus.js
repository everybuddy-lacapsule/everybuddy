export default function (drawerStatus = '', action) {
  if (action.type === "drawer status") {
    return action.drawerStatus;
  } else {
    return drawerStatus;
  }
}