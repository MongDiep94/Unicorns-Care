import Cookies from 'js-cookie';
import {  Navigate, Route } from 'react-router-dom';
export const getCookie =  () => {
  // Récupérer les données de session du cookie
  let sessionData =  Cookies.get('user');

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
