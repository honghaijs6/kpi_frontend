import { combineReducers } from 'redux';

import reducerRegion from './reducer-region';
import reducerSubregion from './reducer-subregion';
import reducerDepartment from './reducer-department';
import reducerOffice from './reducer-office';
import reducerStore from './reducer-store';
import reducerUser from './reducer-user';

import reducerInventory from './reducer-inventory';
import reducerInventoryTrack from './reducer-inventory-track';

import reducerPurchase from './reducer-purchase';

import reducerCointTrack from './reducer-coin-track';
import reducerCoint from './reducer-coin';

import reducerCustomer from './reducer-customer';
import reducerOrder from './reducer-order';

import reducerProduct from './reducer-product';


const allReducers = combineReducers({
  department:reducerDepartment,
  user:reducerUser,
  office:reducerOffice,
  region:reducerRegion,
  subregion:reducerSubregion,
  store:reducerStore,
  inventory:reducerInventory,
  inventory_track:reducerInventoryTrack,
  purchase:reducerPurchase,
  coin_track: reducerCointTrack,
  coin:reducerCoint,
  customer:reducerCustomer,
  order:reducerOrder,
  product:reducerProduct
  
});

export default allReducers;
