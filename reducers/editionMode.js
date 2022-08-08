export default function (editionMode = false, action) {
  if (action.type === "toggleEditionMode") {
    console.log("reducer Edition", action.editionMode)
    return action.editionMode;
  } else {
    return editionMode;
  }
}