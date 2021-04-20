const SET_BREEDS = (state, payload) => {
  state.breeds = payload;
};

const togglePageView = (state, payload) => {
  state.pageView = payload;
};
 const allCats = (state, payload) => {
  state.allCatBreed = payload;
};
export { SET_BREEDS, togglePageView, allCats };
