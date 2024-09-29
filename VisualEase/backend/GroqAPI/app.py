from flask import Flask, request, jsonify
from dotenv import load_dotenv
from groq import Groq
import os
from flask_cors import CORS  # Import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get the Groq API key from the environment
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

@app.route('/extract_terms', methods=['POST'])
def extract_terms():
    data = request.json
    text = data.get('text')
    study_level = data.get('level')

    # Log the received input
    print(f"Received text: {text}")
    print(f"Study level: {study_level}")

    # Construct the prompt for the LLM
    prompt = f"Extract uncommon terms and definitions from the following text for a {study_level} student: {text}"
    
    # Log the constructed prompt
    print(f"Constructed prompt: {prompt}")

    response = client.chat.completions.create(
        messages=[
            {"role": "user", "content": prompt}
        ],
        model="llama3-70b-8192"
    )

    # Log the response from the Groq API
    print(f"Groq API response: {response}")

    result = response.choices[0].message.content
    
    # Log the final result
    print(f"Final result: {result}")
    
    return jsonify({"terms_and_definitions": result})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run Flask on port 5001
