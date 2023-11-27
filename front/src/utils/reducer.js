const InitialState = {
  count: 0,
  questions: [],
}

const questionsReducer = (state = InitialState, action = {}) => {
  // Création des actions de notre reducer
  switch(action.type){
    // Nomenclature CONSTANTE en majuscule
    case "ADD_QUESTION" :
      return {
        ...state,
        // questions: [...state.questions, action.question] OU
        questions: state.questions.concat(action.question),
        count: state.count + 1
      }
      case "DELETE_QUESTION" :
        let newQuestions = [...state.questions]
        newQuestions.splice(action.index, 1)
      return {
        ...state,
        questions: newQuestions,
        count: state.count -1
      }
      case "DELETE_ALL" :
      return {
        ...state,
        questions: [],
        count: 0
      }

    default: return state
  }
}

export default questionsReducer
