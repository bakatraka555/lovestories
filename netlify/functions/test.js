/**
 * Test funkcija za provjeru da li Netlify Functions rade
 */

exports.handler = async (event, context) => {
  console.log('=== TEST FUNCTION CALLED ===');
  console.log('Method:', event.httpMethod);
  console.log('Path:', event.path);
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      success: true,
      message: 'Netlify Functions are working!',
      method: event.httpMethod,
      path: event.path,
      timestamp: new Date().toISOString()
    })
  };
};

