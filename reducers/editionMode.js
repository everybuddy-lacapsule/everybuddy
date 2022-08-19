export default function (editionMode = false, action) {
  if (action.type === "toggleEditionMode") {
    return action.editionMode;
  } else {
    return editionMode;
  }
}