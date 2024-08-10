import fetch from "node-fetch";
const apiDomain = 'https://response-helper-service.onrender.com'

const keepAlive = async () => {
  try {
    const response = await fetch(`${apiDomain}/api/wakeup`);
    const data = await response.text();
    console.log('Pinged API successfully:', data);
  } catch (error) {
    console.error('Error pinging API:', error);
  }
};

await keepAlive();