// This is your backend Netlify Function
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get your API key from Netlify environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async (event) => {
  // 1. Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const { contents, systemInstruction, generationConfig } = JSON.parse(event.body);

    // 2. Use generateContentStream to get a streaming response
    const result = await model.generateContentStream({
      contents,
      systemInstruction,
      generationConfig,
    });

    // 3. Create a ReadableStream to send back to the browser
    const stream = new ReadableStream({
      async start(controller) {
        const textEncoder = new TextEncoder();
        for await (const chunk of result.stream) {
          // Check for safety ratings or blocks
          if (chunk.candidates && chunk.candidates[0].finishReason === 'SAFETY') {
            controller.enqueue(textEncoder.encode(JSON.stringify({
              error: { message: "Generation failed due to safety settings." }
            })));
            controller.close();
            return;
          }

          const text = chunk.text();
          if (text) {
            // Send each piece of text as it arrives
            controller.enqueue(textEncoder.encode(text));
          }
        }
        controller.close();
      },
    });

    // 4. Return the stream with the correct headers
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked", // Optional, but good practice
      },
      isBase64Encoded: false,
      body: stream,
    };

  } catch (error) {
    console.error("Error in Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: { message: error.message || "An internal server error occurred." } }),
    };
  }
};