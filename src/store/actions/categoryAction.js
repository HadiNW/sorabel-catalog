export const createCategory = (category) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection('categories')
            .add({
                ...category
            })
            .then(() => dispatch({type: 'CREATE_CATEGORY_SUCCESS', payload: category}))
            .catch(err => dispatch({ type: 'CREATE_CATEGORY_ERROR'}))
    }
}

export const deleteCategory = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection('categories')
            .doc(id)
            .delete()
            .then(() => dispatch({type: 'DELETE_CATEGORY_SUCCESS' }))
            .catch(err => dispatch({ type: 'DELETE_CATEGORY_ERROR'}))
    }
}