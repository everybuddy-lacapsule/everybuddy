export default function (buddiesList = null, action) {
    if (action.type === "setBuddiesList") {
        return action.buddiesList;
      } else {
        return buddiesList;
      }
  }