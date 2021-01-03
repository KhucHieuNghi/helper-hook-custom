export const useTimer = (timestamp) => {
  const decreaseSecond = (state) => {
    let {
      dd, hh, mm, ss,
    } = state;
    if (ss > 0) ss -= 1;
    else if (mm > 0) {
      ss = 59;
      mm -= 1;
    } else if (hh > 0) {
      ss = 59;
      mm = 59;
      hh -= 1;
    } else if (dd > 0) {
      ss = 59;
      mm = 59;
      hh = 23;
      dd -= 1;
    } else return state;
    return {
      dd, hh, mm, ss,
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_TIME':
        return action.timeState;
      case 'DECREASE_SECOND':
        return decreaseSecond(state);
      default:
        break;
    }
  };

  const initialState = {
    dd: 0,
    hh: 0,
    mm: 0,
    ss: 0,
  };

  const [timer, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timeDate = new Date(timestamp);
    const timeState = {
      // eslint-disable-next-line no-bitwise
      dd: ~~(timeDate / (1000 * 60 * 60 * 24)),
      hh: ~~((timeDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      mm: ~~((timeDate % (1000 * 60 * 60)) / (1000 * 60)),
      ss: ~~((timeDate % (1000 * 60)) / 1000),
    }
    dispatch({ type: 'SET_TIME', timeState });
  }, [timestamp])

  useInterval(() => {
    dispatch({ type: 'DECREASE_SECOND' })
  }, 1000);

  return timer;
}
