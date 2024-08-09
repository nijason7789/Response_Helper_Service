import fetch from "node-fetch";

const keepAlive = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/wakeup');
    const data = await response.text();
    console.log('Pinged API successfully:', data);
  } catch (error) {
    console.error('Error pinging API:', error);
  }
};

setInterval(keepAlive, 60000);