
export default () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition( 
      (loc) => resolve(loc) , 
      (err) => { 
        reject(err)
      });
  });
} 
