import * as ActionTypes from './ActionTypes'
import {baseUrl} from '../shared/baseUrl'

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {dishId, rating, author, comment},
})

export const fetchDishes = () => async dispatch => {
    dispatch(dishesLoading(true))

    try {
        const response = await fetch(baseUrl + 'dishes')
        if (response.ok) {
            const dishes = await response.json()
            dispatch(addDishes(dishes))
        } else {
            var error = new Error(
                'Error ' + response.status + ': ' + response.statusText,
            )
            error.response = response
            throw error
        }
    } catch (err) {
        dispatch(dishesFailed(err))
    }
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
})

export const dishesFailed = err => ({
    type: ActionTypes.DISHES_FAILED,
    payload: err.message,
})

export const addDishes = dishes => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
})

export const fetchComments = () => async dispatch => {
    try {
        const response = await fetch(baseUrl + 'comments')
        if (response.ok) {
            const comments = await response.json()
            dispatch(addComments(comments))
        } else {
            var error = new Error(
                'Error ' + response.status + ': ' + response.statusText,
            )
            error.response = response
            throw error
        }
    } catch (err) {
        dispatch(commentsFailed(err))
    }
}

export const commentsFailed = err => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: err.message,
})

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
})

export const fetchPromos = () => async dispatch => {
    try {
        const response = await fetch(baseUrl + 'promotions')
        if (response.ok) {
            const promotions = await response.json()
            dispatch(addPromos(promotions))
        } else {
            var error = new Error(
                'Error ' + response.status + ': ' + response.statusText,
            )
            error.response = response
            throw error
        }
    } catch (err) {
        dispatch(promosFailed(err))
    }
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
})

export const promosFailed = err => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: err.message,
})

export const addPromos = promos => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos,
})
