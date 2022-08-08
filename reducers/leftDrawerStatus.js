export default function (leftDrawerStatus = '', action) {
  if (action.type === "leftDrawer status") {
console.log('reducer', action.leftDrawerStatus);
    return action.leftDrawerStatus;
  } else {
    return leftDrawerStatus;
  }
}