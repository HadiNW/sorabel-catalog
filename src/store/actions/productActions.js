import firebase from "../../config/firebaseConfig";

export const getProductByCategory = (categoryId, lastProduct) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // dispatch({ type: "GET_PRODUCTS_LOADING" });
    const firestore = firebase.firestore();
    try {
      const startAfter =
        lastProduct &&
        (await firestore
          .collection("products")
          .doc(lastProduct.id)
          .get());

      let query;
      lastProduct
        ? (query = firestore
            .collection("products")
            .where("productCategory", "==", categoryId)
            .orderBy("price")
            .startAfter(startAfter)
            .limit(2))
        : (query = firestore
            .collection("products")
            .where("productCategory", "==", categoryId)
            .orderBy("price")
            .limit(2));

      const querySnap = await query.get();
      if (querySnap.length === 0) {
        return querySnap;
      }
      let products = [];
      querySnap.forEach(each => products.push({ ...each.data(), id: each.id }));
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: products });
      return querySnap;
    } catch (error) {
      // dispatch({ type: "GET_PRODUCTS_ERROR", payload: error });
    }
  };
};
