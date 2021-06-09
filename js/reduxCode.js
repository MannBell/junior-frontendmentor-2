import { createStore } from "redux";

const SLIDERCHANGE = "SLIDERCHANGE";
const DISCOUNT = "DISCOUNT";

const handleSliderChange = (e) => ({
  type: SLIDERCHANGE
  , value: e.target.value
});

const handleDiscountToggle = () => ({
  type: DISCOUNT
})


const initialState = {
  sliderValue: 2
  , discounted: false
};

const reducer = (state={...initialState}, action) => {
  switch(action.type) {
    case SLIDERCHANGE
    : {
      return {...state, sliderValue: action.value}
    }
    case DISCOUNT
    : {
      return {...state, discounted: !state.discounted}
    }
    default
    : return state
  }
}

export const store = createStore(reducer);
export const mapStateToProps = (state) => ({
  sliderValue: state.sliderValue
  , discounted: state.discounted
});
export const mapDispatchToProps = (dispatch) => ({
  handleSliderChange: (e) => dispatch(handleSliderChange(e))
  , handleDiscountToggle: () => dispatch(handleDiscountToggle())
});