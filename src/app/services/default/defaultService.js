import axiosConfig from '../../axiosConfig';

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
