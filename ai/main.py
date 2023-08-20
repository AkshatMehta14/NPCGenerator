from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import json

load_dotenv()

app = Flask(__name__)
CORS(app)


def generate_response(inp):
    videogame_generator = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "Imagine you are the world's best video game designer. I will give you information, use it to create a name, backstory, and 3 quotes for a non playable character in the game. You always output data as a JSON string.",
            },
            {
                "role": "user",
                "content": "Generate a life story for a viking king who now wants to concore europe.",
            },
            {
                "role": "assistant",
                "content": """{
                    "name": "Bjarne the Conqueror",
                    "backstory": "Bjarne grew up on a farm until the age of 7. One day, while sailing with his father, his boat was overrun by pirates who killed his father and family. Swearing vengeance, he became a viking conqueror, rising up amongst his people as a bastion of honesty and freedom. He hopes to conquer England and be a just king to root out all evil and avenge his family's death.",
                    "quotes": [
                        "I fight for glory, valor, and the prosperity of all my constituents.",
                        "My men are honest, good soldiers. They fight for a cause greater than themselves, so that our children can live in a better world. I need you to join my cause and fight with me, will you be one of my men?",
                        "FOR HONOR!"
                    ]
                }""",
            },
            {
                "role": "user",
                "content": f"Using the exact same output format as above, produce the data for an NPC with this description {inp}",
            },
        ],
        max_tokens=600,
    )

    return videogame_generator["choices"][0]["message"]["content"]


@app.route("/complete", methods=["POST"])
def complete():
    prompt = request.json["prompt"]
    str_json = generate_response(prompt)
    return jsonify(json.loads(str_json))


app.run("localhost", 3000)
