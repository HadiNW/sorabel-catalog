const inisState = {
  categories: [],
  loading: false,
  error: false
};

const categoryReducer = (state = inisState, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY_LOADING":
      return {
        ...state,
        loading: true
      };
    case "CREATE_CATEGORY_SUCCESS":
      return {
        ...state,
        
      };
  }
};

export default categoryReducer;
