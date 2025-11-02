// netlify/functions/get-travel-costs.js

exports.handler = async (event, context) => {
  // 1. Get the 'from' and 'to' locations from your app
  const { from, to } = JSON.parse(event.body);

  // 2. --- THIS IS WHERE YOU WOULD CALL REAL APIS ---
  // You would need to sign up for APIs (like Skyscanner, Amadeus, etc.)
  // and use their API keys (stored in Netlify) to get real data.
  //
  // Example (pseudo-code):
  // const flightApiUrl = `https://api.skyscanner.com/...?from=${from}&to=${to}`;
  // const flightData = await fetch(flightApiUrl, { headers: { 'X-Api-Key': process.env.SKYSCANNER_KEY }});
  // const flightJson = await flightData.json();
  // const realFlightCost = flightJson.price;

  // 3. --- FOR NOW, WE WILL RETURN REALISTIC FAKE DATA ---
  // We'll generate random prices to show that it's working.
  const distance = Math.floor(Math.random() * 2000) + 300; // Random distance
  
  const estimatedCosts = {
    flight: Math.floor(Math.random() * 5000) + 4500, // Random flight cost
    train: Math.floor(Math.random() * 1000) + 800,   // Random train cost
    bus: Math.floor(Math.random() * 800) + 600,      // Random bus cost
    distance: distance,
    from: from,
    to: to
  };

  // 4. Return the data to your app as JSON
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(estimatedCosts),
  };
};