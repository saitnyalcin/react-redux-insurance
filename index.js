const { createStore, combineReducers } = require('redux');

// Action types
const ACTION_TYPE = {
  CREATE_CLAIM: 'CREATE_CLAIM',
  CREATE_POLICY: 'CREATE_POLICY',
  DELETE_POLICY: 'DELETE_POLICY'
};

//People dropping off the forms which are my {Action Creators}
const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    // This is the from
    type: ACTION_TYPE.CREATE_CLAIM,
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};

const createPolicy = name => {
  return {
    type: ACTION_TYPE.CREATE_POLICY,
    payload: {
      name: name,
      amount: 20
    }
  };
};

const deletePolicy = name => {
  return {
    type: ACTION_TYPE.DELETE_POLICY,
    payload: {
      name: name
    }
  };
};

// Company Departmentt (Reducers)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === ACTION_TYPE.CREATE_CLAIM) {
    return [...oldListOfClaims, action.payload];
  }
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === ACTION_TYPE.CREATE_CLAIM) {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === ACTION_TYPE.CREATE_POLICY) {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === ACTION_TYPE.CREATE_POLICY) {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === ACTION_TYPE.DELETE_POLICY) {
    return listOfPolicies.filter(policy => policy != action.payload.name);
  }
  return listOfPolicies;
};

// Company setup
const departmentRootReducer = combineReducers({
  claimsHistory: claimsHistory,
  accounting: accounting,
  policies: policies
});

// Company Store
const store = createStore(departmentRootReducer);

store.dispatch(createPolicy('Steve Yalcin'));
store.dispatch(createClaim('Steve Yalcin', 50));
store.dispatch(deletePolicy('Alex Brown'));

store.unsubscribe;

console.log(store.getState());
