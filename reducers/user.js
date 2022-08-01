export default function(user='', action) {
    if(action.type === 'register') {
        var userCopy = action.user;
        return userCopy;
    } else {
        return user;
    }
   }