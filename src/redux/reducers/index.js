import { combineReducers } from 'redux';

import reducerRegion from './reducer-region';
import reducerSubregion from './reducer-subregion';
import reducerDepartment from './reducer-department';
import reducerOffice from './reducer-office';
import reducerStore from './reducer-store';
import reducerUser from './reducer-user';

import reducerPurchase from './reducer-purchase';



import reducerCustomer from './reducer-customer';
import reducerOrder from './reducer-order';

import reducerProduct from './reducer-product';
import reducerCategory from './reducer-category';
import reducerSupplier from './reducer-supplier';
import reducerUnit from './reducer-unit';
import reducerDeleteReason from './reducer-delete-reason';
import reducerTransporter from './reducer-transporter';

import reducerBillAccount from './reducer-bill-account';
import reducerPayment from './reducer-payment';

import reducerCusType from './reducer-customer-type' ;
import reducerLevel from './reducer-level'; 
import reducerCusStatus from './reducer-customer-status'; 
import reducerCusOriginal from './reducer-customer-original'; 



const allReducers = combineReducers({
  department:reducerDepartment,
  user:reducerUser,
  office:reducerOffice,
  regions:reducerRegion,
  subregions:reducerSubregion,
  store:reducerStore,
  
  
  purchase:reducerPurchase,

  customers:reducerCustomer,
  order:reducerOrder,
  products:reducerProduct,
  categories:reducerCategory,
  suppliers:reducerSupplier,
  units:reducerUnit,
  delete_reasons:reducerDeleteReason,
  transporters:reducerTransporter,
  bill_accounts:reducerBillAccount,
  payments:reducerPayment,
  customer_types:reducerCusType,
  levels:reducerLevel,
  customer_status:reducerCusStatus,
  customer_originals:reducerCusOriginal

});

export default allReducers;
