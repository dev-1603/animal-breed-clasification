import axios from "axios";
import _ from "lodash";
const getBreeds = async ({ commit, state }, params) => {
  try {
    // add x-api-key as header
    axios.defaults.headers.common["x-api-key"] = state.api_key;
    let url = "https://api.thecatapi.com/v1/breeds";
    if (params.q) url = url + "/search";
    let response = await axios.get(url, { params });
    commit("SET_BREEDS", response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
const getFilteredBreed = ({ state }, params) => {
  const { allCatBreed } = state;
  const val = params.q.toLowerCase();
  const data = _.filter(
    allCatBreed?.data,
    x => x.name.toLowerCase().indexOf(val) > -1
  );
  const sliceRange = Number(params?.page) * Number(params?.limit);
  const obj = {
    page: params?.page,
    rowsPerPage: params?.limit,
    rowNumber: data.length,
    data: data.slice(sliceRange, sliceRange + 10)
  };
  return obj;
};
export { getBreeds, getFilteredBreed };
