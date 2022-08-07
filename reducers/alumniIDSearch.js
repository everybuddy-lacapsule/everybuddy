export default function (alumniIDSearch = null, action) {
    if (action.type === "getAlumniIDSearch") {
      return action.id;
    } else {
      return alumniIDSearch;
    }
  }