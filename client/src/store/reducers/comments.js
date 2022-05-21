import axios from 'axios'

export const commentPost = async (state, comment) => {
    if (!state.getters.isLoggedIn) {
        state.commit('setAction', 'login');
        state.commit('showDialog')
        state.commit('setLoading', false)
        return;
    }
    await axios.post(`/comments/${comment.postId}`, {
        text: comment.text,
        createdBy: comment.createdBy
    }).then((res) => {
        state.commit('addComment', res.data)
        state.commit('hideDialog')
        state.commit('setLoading', false)
    }).catch(err => {
        state.commit('setLoading', false)
        state.commit('hideDialog')
        switch (err.response.status) {
            case 404:
                state.commit('setMessage', {
                    text: 'No post found',
                    type: 'error'
                })
                break;
            default:
                state.commit('setMessage', {
                    text: 'Something went wrong',
                    type: 'error'
                })
                break;
        }
    })
}

export const deleteComment = async (state, comment) => {
    await axios.delete(`/comments/${comment.postId}/${comment._id}`)
        .then((res) => {
            state.commit('setCurrentPost', res.data.post)
            state.commit('setLoading', false)
            state.commit('hideDialog')
        }).catch(err => {
            state.commit('hideDialog')
            state.commit('setLoading', false)
            switch (err.response.status) {
                case 404:
                    state.commit('setMessage', {
                        text: 'No item found',
                        type: 'error'
                    })
                    break;
                default:
                    state.commit('setMessage', {
                        text: 'Something went wrong',
                        type: 'error'
                    })
                    break;
            }
        })
}

export const updateComment = async (state, comment) => {
    await axios.patch(`/comments/${comment.postId}/${comment._id}`, {
        text: comment.text
    }).then((res) => {
        state.commit('setCurrentPost', res.data.post)
        state.commit('setLoading', false)
        state.commit('hideDialog')
    }).catch(err => {
        state.commit('hideDialog')
        state.commit('setLoading', false)
        switch (err.response.status) {
            case 404:
                state.commit('setMessage', {
                    text: 'No item found',
                    type: 'error'
                })
                break;
            default:
                state.commit('setMessage', {
                    text: 'Something went wrong',
                    type: 'error'
                })
                break;
        }
    })
}