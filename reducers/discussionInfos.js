export const discussionInfos = (getDiscussionID = {}, action) => {
  if (action.type === "getDiscussionID") {
    return action.discussionInfos;
  } else {
    return getDiscussionID;
  }
};
