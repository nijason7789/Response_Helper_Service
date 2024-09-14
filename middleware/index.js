export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error processing request');
  };
  
export const requestLogger = (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
  next();
};