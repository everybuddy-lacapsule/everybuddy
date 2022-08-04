export const discussionID = (getDiscussionID = "", action) => {
  if (action.type === "getDiscussionID") {
    return action.discussionID;
  } else {
    return getDiscussionID;
  }
};
