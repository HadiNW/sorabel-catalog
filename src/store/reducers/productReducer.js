const initState = {
  products: [],
  error: null,
  loading: false
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_LOADING":
      return {
        ...state,
        loading: true
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        error: null,
        loading: false
      };
    case "GET_PRODUCTS_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case "CREATE_PRODUCTS_SUCCESS":
      return state

    default:
      return state;
  }
};

export default productReducer;
