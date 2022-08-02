export default function(userID=null, action) {
    if(action.type === 'register') {
        var userIDCopy = action.userID;
        return userIDCopy;
    } else {
        return userID;
    }
   }