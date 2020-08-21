import * as ActionTypes from './ActionTypes'
import {baseUrl} from '../shared/baseUrl'

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
})

export const postComment = (
    dishId,
    rating,
    author,
    comment,
) => async dispatch => {
    const newComment = {
        dishId,
        rating,
        author,
        comment,
        date: new Date().toISOString(),
    }

    try {
        const response = await fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
        })
        if (response.ok) {
            const comment = await response.json()
            dispatch(addComment(comment))
        } else {
            var error = new Error(
                'Error ' + response.status + ': ' + response.statusText,
            )
            error.response = response
            throw error
        }
    } catch (err) {
        console.log('Post comment failed', error.message)
        alert(`We were unable to post your comment
Error: ${err.message}`)
    }
}

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

export const fetchLeaders = () => async dispatch => {
    dispatch(leaderLoading(true))

    try {
        const response = await fetch(baseUrl + 'leaders')
        if (response.ok) {
            const leaders = await response.json()
            dispatch(addLeaders(leaders))
        } else {
            var error = new Error(
                'Error ' + response.status + ': ' + response.statusText,
            )
            error.response = response
            throw error
        }
    } catch (err) {
        dispatch(leadersFailed(err))
    }
}

export const leaderLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
})

export const leadersFailed = err => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: err.message,
})

export const addLeaders = leaders => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders,
})

export const postFeedback = feedback => async dispatch => {
    try {
        const response = await fetch(baseUrl + 'feedback', {
            method: 'POST',
            body: JSON.stringify(feedback),
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
        })
        if (response.ok) {
            const feedback = await response.json()
        } else {
            var error = new Error(
                'Error ' + response.status + ': ' + response.statusText,
            )
            error.response = response
            throw error
        }
    } catch (err) {
        console.log('Post feedback failed', error.message)
        alert(`We were unable to post your feedback
Error: ${err.message}`)
    }
}
