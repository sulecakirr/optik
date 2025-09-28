import axios from 'axios'
import Vue from 'vue'

export default {
  bulkGetRequest: async function (urls) {
    const errors = [];
    try {
      const requests = urls.map(url => axios.get(url));
      const responses = await Promise.allSettled(requests);

      responses.forEach(response => {
        if (response.status !== 'fulfilled') {
          errors.push(response.reason);
          Vue.prototype.$toastSubu(response.reason.toString(), 'danger');
        }
      });
      return responses;
    } catch (error) {
      errors.push(error);
      Vue.prototype.$toastApiResponse(error);
    }
  },
  deleteRequest: async function (url, queryParams) {
    try {
      const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

      const deleteUrl = `${url}?${queryString}`;
      const response = await axios.delete(deleteUrl);
      Vue.prototype.$toastApiResponse(response.data)
      return response;
    } catch (error) {
      Vue.prototype.$toastApiResponse(error)
    }
  },
  getRequest: async function (url) {
    try {
      const request = axios.get(url)
      return await request
    } catch (error) {
      Vue.prototype.$toastApiResponse(error)
    }
  },
  postRequest: async function (url, data) {
    try {
      const response = await axios.post(url, data)
      Vue.prototype.$toastApiResponse(response.data)
      return response
    } catch (error) {
      Vue.prototype.$toastApiResponse(error)
    }
  },
  putRequest: async function (url, data) {
    try {
      const response = await axios.put(url, data)
      Vue.prototype.$toastApiResponse(response.data)
      return response
    } catch (error) {
      Vue.prototype.$toastApiResponse(error)
    }
  },
  getDataFromResponseList: function (response) {
    return response.status === "fulfilled" ? response.value.data.data : [];
  },
  getDataFromResponseNull: function (response) {
    return response.status === "fulfilled" ? response.value.data.data : null
  },
  getDataFromResponseNumber: function (response) {
    return response.status === "fulfilled" ? response.value.data.data : 0
  },
}