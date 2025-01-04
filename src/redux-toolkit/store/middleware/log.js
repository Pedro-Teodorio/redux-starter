const log = (store) => (next) => (action) => {
  console.log(action);
  next(action); // This will pass action to next middleware or reducer
};

export default log;
