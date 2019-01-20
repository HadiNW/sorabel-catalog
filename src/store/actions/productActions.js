import firebase from "../../config/firebaseConfig";

export const getProductByCategory = (categoryId, lastProduct) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore();

    const startAfter =
      lastProduct &&
      (await firestore
        .collection("products")
        .doc(lastProduct.id)
        .get());

    let query;
    if (lastProduct) {
      query = firestore
              .collection("products")
              .orderBy("price")
              .startAfter(startAfter)
              .limit(2);
    } else {
      query = firestore
              .collection("products")
              .orderBy("price")
              .limit(2);
    }

    const querySnap = await query.get()
    if (querySnap.length === 0) {
      return querySnap
    }

    try {
      let products = []
      querySnap.forEach(each => products.push({...each.data(), id: each.id}))
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: products });
      return querySnap
    }
    catch(error) {
      console.log(error)
    }
    // const xs = await firestore
    //   .collection("products")
    //   .where("productCategory", "==", categoryId)
    //   .orderBy("price")
    //   .limit(4)
    //   .startAfter(100)
    //   .get()
    //   .then(data => {
    //     const products = [];
    //     data.forEach(each => products.push({ ...each.data(), id: each.id }));
    //     dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: products });
    //   })
    //   .catch(err => {
    //     dispatch({ type: "GET_PRODUCTS_ERROR" });
    //     console.log(err);
    //   });
  };
};
