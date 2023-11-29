import Cookies from 'js-cookie';

export const auth =  () => {

  // Récupérer les données de session du cookie
  const sessionData = Cookies.get('sessionToken');

  if (sessionData) {
    return {
      Authorization: "Bearer " + sessionData
    };
  } else {
    return {};
  }

<<<<<<< HEAD
  if (sessionData && sessionData.isLogged) {
    return sessionData.isLogged
  }
  return false
=======
>>>>>>> 17509a77f6e0e413154f28c3975a8219a536da7f
};
console.log("Headers:", auth());
