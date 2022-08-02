export default function(userEmail=null, action) {
    if(action.type === 'saveEmail') {
        
        return action.userEmail ;
    } else {
        return userEmail;
    }
   }