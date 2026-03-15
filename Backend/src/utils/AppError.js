class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default AppError;

// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);

//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.isOperational = true; // علامة لتحديد إن الخطأ متوقع

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export default AppError;
