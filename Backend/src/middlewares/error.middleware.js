export const errorHandling = async (err, req, res, next) => {
  console.log(err.stack);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: "error message",
    error: err.message,
  });
};

// app.use((err, req, res, next) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message
//     });
//   } else {
//     console.error('ERROR 💥', err);
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went wrong!'
//     });
//   }
// });
