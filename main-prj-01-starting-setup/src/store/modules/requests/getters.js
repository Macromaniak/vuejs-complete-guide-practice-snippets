export default {
    requests(state, _, _2, rootGetters) {
        const coachId = rootGetters.getUserId;
        console.log(coachId);
        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};