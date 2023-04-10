import json
import sys
import pyttsx3
from flask import Flask, jsonify, request
from flask_cors import CORS
from tkinter import *
import threading
import pygame

root = Tk()

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

last_phrase = None
paused_phrase = None

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

def onWord(name, location, length):
  app.logger.info('word', name, location, length)
def onEnd(name, completed):
  app.logger.info('finishing', name, completed)


def play(data):
  engine = pyttsx3.init()
  phrases = data['phrases']
  tracks = data['tracks']
  app.logger.info(paused_phrase)
  # if(paused_phrase):
  #   if(paused_phrase.phraseIndex < phrase.phraseIndex):
  #     for phrase in phrases:
  #       track=next((track for track in tracks if track['id'] == phrase['trackId']), None)
  #       if(track):
  #         voice=track['voice']
  #       if(voice):
  #         engine.setProperty('voice',voice)
  #       else:
  #         engine.setProperty('voice','HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Speech\\Voices\\Tokens\\TTS_MS_EN-US_DAVID_11.0') 
  #       engine.say(phrase['phrase'])
  #       global last_phrase
  #       last_phrase = phrase
  #     engine.runAndWait()
  # else:
  for phrase in phrases:
    track=next((track for track in tracks if track['id'] == phrase['trackId']), None)
    if(track):
      voice=track['voice']
    if(voice):
      engine.setProperty('voice',voice)
    else:
      engine.setProperty('voice','HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Speech\\Voices\\Tokens\\TTS_MS_EN-US_DAVID_11.0') 
    engine.say(phrase['phrase'])
    last_phrase = phrase
  engine.runAndWait()
  return jsonify("Completed")

# Convert text to audio
@app.route("/audio",methods = ['POST'])
def audio():
  data = json.loads(request.data)
  app.logger.info(data)
  app.logger.info(paused_phrase)
  play(data)
  return jsonify("Completed")


@app.route("/stop-player")
def stopPlayer():
  engine = pyttsx3.init()
  engine.stop()
  return jsonify("Stopped")

@app.route("/pause-player")
def pausePlayer():
  engine = pyttsx3.init()
  engine.stop()
  global paused_phrase
  global last_phrase
  paused_phrase=last_phrase
  return jsonify("Paused", last_phrase)

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
