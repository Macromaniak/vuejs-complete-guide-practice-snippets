export default {
  async contactCoach(context, payload) {
    const request = {
      id: new Date().toISOString(),
      ...payload,
    };

    const response = await fetch(
      'https://coach-hire-d02a4-default-rtdb.firebaseio.com/requests.json',
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to Register!');
      throw error;
    }

    context.commit('addRequest', request);
  },
  async loadRequests(context) {
    const token = context.rootGetters.token;
    const response = await fetch(
      'https://coach-hire-d02a4-default-rtdb.firebaseio.com/requests.json?auth=' + token
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Requests load failed!');
      throw error;
    } else {
      const requests = [];

      for (const key in responseData) {
        const newReq = {
          coachId: responseData[key].coachId,
          email: responseData[key].email,
          message: responseData[key].message,
        };
        requests.push(newReq);
      }

      context.commit('setRequests', requests);
    }
  },
};
