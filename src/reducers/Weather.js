import assignAll from 'lodash/fp/assignAll';

const initialState = {
  error: null,
  isPending: true,
  result: {},
};

export default function weatherReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'WEATHER_REQUEST':
      return assignAll([
        state,
        {isPending: true},
      ]);

    case 'WEATHER_SUCCESS':
      return assignAll([
        state,
        {
          error: null,
          isPending: false,
          result: action.payload,
        },
      ]);

    case 'WEATHER_FAILURE': {
      if (!action.error) {return state;}
      return assignAll([
        state,
        {
          isPending: false,
          error: action.payload,
        },
      ]);
    }

    default:
      return state;

  }
}
