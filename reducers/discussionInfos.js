export const discussionInfos = (getDiscussionID = {}, action) => {
  if (action.type === "getDiscussionID") {
    //console.log("reducerDicID", action.discussionInfos);
    return action.discussionInfos;
  } else {
    return getDiscussionID;
  }
};
