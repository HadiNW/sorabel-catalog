const initState = {
  products: [],
  error: null,
  loading: false
};

const productReducer = (state = initState, action) => {
  console.log("TEST", action.payload);
  switch (action.type) {
    case "GET_PRODUCTS_LOADING":
      return {
        ...state,
        loading: true,

      };
    case "GET_PRODUCTS_SUCCESS":
      console.log(action.payload, "ACTIONNNN");
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

    default:
      return state;
  }
};

export default productReducer;
