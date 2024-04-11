export default {
    async addCoach(context, data) {
        const userId = context.rootGetters.getUserId;
        const newCoach = {
            firstName: data.fname,
            lastName: data.lname,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };
        const token = context.rootGetters.token;
        const response = await fetch(`https://coach-hire-d02a4-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token, {
            method: 'PUT',
            body: JSON.stringify(newCoach),
        });

        const responseData = await response.json();

        if(!response.ok)
        {
            const error = new Error(responseData.message || 'Failed to Register!');
            throw error;
        }

        context.commit('addCoach', {...newCoach, id: userId});
    },
    async loadCoaches(context) {
        const response = await fetch('https://coach-hire-d02a4-default-rtdb.firebaseio.com/coaches.json');
        const responseData = await response.json();

        if(!response.ok)
        {
            const error = new Error(responseData.message || 'Failed to fetch data!')
            throw error;
        }
        else
        {
            const coaches = [];

            for(const key in responseData)
            {
                const newCoach = {
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    areas: responseData[key].areas,
                    description: responseData[key].description,
                    hourlyRate: responseData[key].hourlyRate,
                };

                coaches.push(newCoach);
            }

            context.commit('setCoaches', coaches)
        }
    }
};