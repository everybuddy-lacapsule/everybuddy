export default function (drawerStatus = '', action) {
  if (action.type === "drawer status") {
console.log('reducer', action.drawerStatus);
    return action.drawerStatus;
  } else {
    return drawerStatus;
  }
}