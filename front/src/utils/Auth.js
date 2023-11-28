import Cookies from 'js-cookie';

export const auth =  () => {
  // Récupérer les données de session du cookie
  let sessionData =  Cookies.get('sessionToken');

  if(typeof(sessionData) !== "undefined"){
    sessionData = JSON.parse(sessionData)
  }else{
    return false
  }

  if (sessionData && sessionData.isLogged) {
    console.log('ID de l\'utilisateur :', sessionData.isLogged);
    return sessionData.isLogged
  }
  return false
};
