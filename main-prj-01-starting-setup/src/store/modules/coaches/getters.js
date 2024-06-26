export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
        const userId = rootGetters.getUserId;
        const coaches = getters.coaches;

        return coaches.some(coach => coach.id === userId);
    }
};