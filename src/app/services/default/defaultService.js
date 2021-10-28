import axiosConfig from "../../axiosConfig";

// eslint-disable-next-line import/prefer-default-export
export const getReportService = (data) => {
  return axiosConfig
    .post(`/xrpl/get-balance`, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};

export const downloadCSVReport = (data) => {
  return axiosConfig
    .post(`/xrpl/get-balance/csv`, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};

export const downloadPDFReport = (data) => {
  return axiosConfig
    .post(`/xrpl/get-balance/pdf`, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};

export const testDBConnection = (data) => {
  return axiosConfig
    .post(`/xrpl/db/connection`, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};

export const syncDB = (data) => {
  return axiosConfig
    .post(`/xrpl/db/sync`, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};