import json
import sys
import pyttsx3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app_config = {"host": "0.0.0.0", "port": 5000}

"""
---------------------- DEVELOPER MODE CONFIG -----------------------
"""
# Developer mode uses app.py
if "app.py" in sys.argv[0]:
  # Update app config
  app_config["debug"] = True

  # CORS settings
  cors = CORS(
    app,
    resources={r"/*": {"origins": "http://localhost*"}},
  )

  # CORS headers
  app.config["CORS_HEADERS"] = "Content-Type"


"""
--------------------------- REST CALLS -----------------------------
"""

# Remove and replace with your own
@app.route("/example")
def example():

  # See /src/components/App.js for frontend call
  return jsonify("Example response from Flask! Learn more in /app.py & /src/components/App.js")

@app.route("/voices")
def voices():
  engine = pyttsx3.init()
  voices = engine.getProperty('voices')
  voiceList = []
  for voice in voices:
    dict_obj = {
        'name':voice.name,
        'id':voice.id
    }
    voiceList.append(dict_obj)
  return jsonify(voiceList)

# Convert text to audio
@app.route("/audio",methods = ['POST'])
def audio():
  data = json.loads(request.data)
  app.logger.info(data)
  engine = pyttsx3.init()
  phrases = data['phrases']
  tracks = data['tracks']
  for phrase in phrases:
    track=next((track for track in tracks if track['id'] == phrase['layerId']), None)
    voice=track['voice']
    engine.setProperty('voice',voice)
    engine.say(phrase['phrase'])
  engine.runAndWait()
  return jsonify("Completed")


"""
-------------------------- APP SERVICES ----------------------------
"""
# Quits Flask on Electron exit
@app.route("/quit")
def quit():
  shutdown = request.environ.get("werkzeug.server.shutdown")
  shutdown()

  return


if __name__ == "__main__":
  app.run(**app_config)
