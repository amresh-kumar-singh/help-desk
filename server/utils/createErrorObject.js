export default function (error) {
  const err = {};
  //   Setting whole error for developer to debug
  err.error = error;
  switch (error.name) {
    case "ValidationError":
      err.code = 403;
      err.message = Object.values(error.errors)[0].message;
      break;
    case "MongoServerError":
      err.code = 403;
      if (error.code === 11000)
        err.message = `${Object.keys(
          error.keyValue
        )} with value ${Object.values(error.keyValue)} already exists!`;
      break;
    default:
      err.code = 400;
      err.message = error.message;
  }
  return err;
}
