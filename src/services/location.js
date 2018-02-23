
export default () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition( 
      (loc) => resolve(loc) , 
      (err) => { 
        console.log("rejecting: ", err); 
        reject(err)
      });
  });
} 
