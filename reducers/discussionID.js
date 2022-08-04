export const discussionID = (getDiscussionID = "", action) => {
  if (action.type === "getDiscussionID") {
    console.log('reducerDicID', action.discussionID)
    return action.discussionID;
  } else {
    return getDiscussionID;
  }
};
