// netlify/functions/get-itinerary.js

exports.handler = async function(event, context) {
    // 1. Handle Preflight (OPTIONS) request for CORS
    // This tells the browser "Yes, you are allowed to talk to me"
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: ""
        };
    }

    // 2. Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // Parse the incoming data
        const { userQuery, systemPrompt, schema } = JSON.parse(event.body);

        // Get the API Key from Netlify Environment Variables
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return { 
                statusCode: 500, 
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Server Error: API Key missing in Netlify settings." }) 
            };
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        // Call Google Gemini
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            })
        });

        const data = await response.json();
        
        // Return the data with CORS headers enabled
        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" }, 
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: error.message })
        };
    }
};