import firebase from "../../config/firebaseConfig";

export const getProductByCategory = (categoryId, lastProduct) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
   
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


export const createProduct = (product) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore();
    firestore
      .collection('products')
      .add({...product})
      .then(() => {
        dispatch({ type: "CREATE_PRODUCTS_SUCCESS"});
      })
      .catch(err => {
        // dispatch({ type: "CREATE_PRODUCTS_ERROR"});
      })

  }
}

export const deleteProduct = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore();
    firestore
      .collection('products')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_PRODUCTS_SUCCESS"});
      })
      .catch(err => {
        dispatch({ type: "CREATE_PRODUCTS_ERROR"});
      })

  }
}