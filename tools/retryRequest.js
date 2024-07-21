const retryRequest = async (fn, args, maxRetries) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        return await fn(...args);
      } catch (error) {
        attempts++;
        if (attempts >= maxRetries) {
          throw error;
        }
        console.log(`Retrying... Attempt ${attempts + 1}`);
      }
    }
  };

export default retryRequest