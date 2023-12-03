/*
{
  user: {
    firstName: "" ,
    lastName: "",
    email: "",
    addressNumber: "",
    addressStreet: "",
    addressCity: "",
    addressZipcode: "",
  }
}
*/
/*
action.
{
  type: "update",
  input:
    "firstName" |
    "lastName" |
    "email" |
    "addressNumber" |
    "addressStreet" |
    "addressCity" |
    "addressZipcode",
  value: ""
  }
*/

// pas de mutation du state d'origine car impossible de faire une comparaison du state d'origine et le nouveau state.
export const userReducer = (state, action ) => {
  console.log('userReducer', action, state)
  if (action.type === 'update') {
    // copie du state user
    const user = {
      ...state.user
    }
    // autoristaion de mutation sur la copie
    user[action.input]= action.value
    return {
      // copie du state avec user en ligne 35
      ...state,
      user: user
    }

  }
  throw Error('Unknown action.');
}
