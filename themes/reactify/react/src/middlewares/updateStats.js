import jwt_decode from 'jwt-decode'
import {loadDashboardStats} from "../AC/adminActions";
import {LOAD_DASHBOARD_STATS, START} from "../constants";

export default store => next => action => {
  const {updateStats, toast, ...rest} = action
  if (!updateStats)  return next(action)

    console.log('---------------hui------------------')

  //console.error('toast dispatched')
  //store.dispatch(addToast())
store.dispatch(loadDashboardStats())
  //return next({...rest, type: LOAD_DASHBOARD_STATS})
  return next(action)
}
