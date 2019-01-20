const initState = {
  products: [],
  error: null
};

const productReducer = (state = initState, action) => {
  console.log("TEST", action.payload);
  switch (action.type) {
    case "GET_PRODUCTS_LOADING":
      return {
        ...state
      };
    case "GET_PRODUCTS_SUCCESS":
      console.log(action.payload, "ACTIONNNN");
      return {
        ...state,
        products: action.payload,
        error: null
      };
    case "GET_PRODUCTS_ERROR":
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default productReducer;
