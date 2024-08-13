const JsonTruncator = async (response) => {
    const match = response.match(/```json([\s\S]*?)```/);
  
    if (match?.[1]) {
      try {
        const jsonString = match[1].trim();
        const parsedJSON = JSON.parse(jsonString);
        console.log('truncated successfully, returning with parsedJson: /n',parsedJSON)
        return parsedJSON;
      } catch (error) {
        console.error('JSON parsing error:', error);
        return response;
      }
    } else {
      console.error('No Json object found.');
      return response;
    }
  };
  
  export default JsonTruncator