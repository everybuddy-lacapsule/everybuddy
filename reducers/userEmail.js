export default function(userEmail=null, action) {
    if(action.type === 'saveEmail') {
        var userEmailCopy = action.userEmail;
        return userEmailCopy;
    } else {
        return userEmail;
    }
   }