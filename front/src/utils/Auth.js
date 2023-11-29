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

};
console.log("Headers:", auth());
