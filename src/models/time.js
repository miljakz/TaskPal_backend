// store/modules/time.js

import axios from 'axios'; // Ensure axios is available for making HTTP requests

const state = {
    currentEntry: null,
    entries: []
};

const mutations = {
    START_TIME(state, entry) {
        state.currentEntry = entry;
    },
    STOP_TIME(state, entry) {
        state.currentEntry = null;
        state.entries.push(entry);
    },
    SET_ENTRIES(state, entries) {
        state.entries = entries;
    }
};

const actions = {
    async startTime({ commit }, { taskId, userId }) {
        try {
            const response = await axios.post('/api/time/start', { task: taskId, user: userId });
            commit('START_TIME', response.data);
        } catch (error) {
            console.error('Failed to start time:', error);
        }
    },
    async stopTime({ commit, state }) {
        if (state.currentEntry) {
            try {
                const response = await axios.post(`/api/time/stop/${state.currentEntry._id}`);
                commit('STOP_TIME', response.data);
            } catch (error) {
                console.error('Failed to stop time:', error);
            }
        }
    },
    async fetchEntries({ commit }) {
        try {
            const response = await axios.get('/api/time/entries');
            commit('SET_ENTRIES', response.data);
        } catch (error) {
            console.error('Failed to fetch entries:', error);
        }
    }
};

const getters = {
    currentEntry: state => state.currentEntry,
    entries: state => state.entries
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
