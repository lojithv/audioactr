import json
import os
import sys
import pyttsx3
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from tkinter import *
import threading
import pygame
import pydub
from pydub import AudioSegment

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
            'name': voice.name,
            'id': voice.id
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
    for phrase in phrases:
        track = next(
            (track for track in tracks if track['id'] == phrase['trackId']), None)
        if (track):
            voice = track['voice']
            volume = track['volume']
            speechRate = track['speechRate']
        if (voice):
            engine.setProperty('voice', voice)
        else:
            engine.setProperty(
                'voice', 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Speech\\Voices\\Tokens\\TTS_MS_EN-US_DAVID_11.0')
        if (volume):
            engine.setProperty('volume', volume/100)
        else:
            engine.setProperty('volume', 1.0)
        if (speechRate):
            engine.setProperty('rate', speechRate)
        else:
            engine.setProperty('rate', 200)
        engine.say(phrase['phrase'])
        last_phrase = phrase
    engine.runAndWait()
    engine.stop()
    return jsonify("Completed")

# Convert text to audio


def handlePlaySinglePhrase(data):
    engine = pyttsx3.init()
    phrase = data['phrase']
    track = data['track']
    app.logger.info(paused_phrase)

    if (track):
        voice = track['voice']
    if (voice):
        engine.setProperty('voice', voice)
    else:
        engine.setProperty(
            'voice', 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Speech\\Voices\\Tokens\\TTS_MS_EN-US_DAVID_11.0')
    engine.say(phrase['phrase'])
    engine.runAndWait()
    engine.stop()
    return jsonify("Completed")


@app.route("/audio", methods=['POST'])
def audio():
    data = json.loads(request.data)
    app.logger.info(data)
    app.logger.info(paused_phrase)
    play(data)
    return jsonify("Completed")


@app.route("/play-single-phrase", methods=['POST'])
def playSinglePhrase():
    data = json.loads(request.data)
    app.logger.info(data)
    app.logger.info(paused_phrase)
    handlePlaySinglePhrase(data)
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
    paused_phrase = last_phrase
    return jsonify("Paused", last_phrase)


def convertAudioToMp3(data):
    engine = pyttsx3.init()
    phrases = data['phrases']
    tracks = data['tracks']
    audio_segments = []
    app.logger.info(paused_phrase)
    # Define a list to store the audio segments
    for phrase in phrases:
        track = next(
            (track for track in tracks if track['id'] == phrase['trackId']), None)
        if (track):
            voice = track['voice']
        if (voice):
            engine.setProperty('voice', voice)
        else:
            engine.setProperty(
                'voice', 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Speech\\Voices\\Tokens\\TTS_MS_EN-US_DAVID_11.0')
        # engine.say(phrase['phrase'])

        # Speak the current phrase and save the output to a file
        engine.save_to_file(
            phrase["phrase"], f"backend\\audioFiles\\{phrase['phraseIndex']}.wav")
    engine.runAndWait()
    engine.stop()

    for phrase in phrases:
        # Load the audio file into an AudioSegment object and append it to the list
        audio_file = AudioSegment.from_file(
            f"E:\\Dev Workspace\\personal\\audioactr\\backend\\audioFiles\\{phrase['phraseIndex']}.wav", format="mp3")
        audio_segments.append(audio_file)

    # Concatenate the audio segments into a single audio file
    output_file = AudioSegment.empty()
    for audio_segment in audio_segments:
        output_file += audio_segment

    # # Export the concatenated audio file as an MP3
    output_file.export("backend\\convertedFiles\\output.mp3", format="mp3")

# Convert text to audio


def handleConvertSinglePhraseToMp3(data):
    engine = pyttsx3.init()
    phrase = data['phrase']
    track = data['track']
    voice = track['voice']
    audio_segments = []
    if (voice):
        engine.setProperty('voice', voice)
    else:
        engine.setProperty(
            'voice', 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Speech\\Voices\\Tokens\\TTS_MS_EN-US_DAVID_11.0')
    engine.save_to_file(
        phrase["phrase"], f"backend\\audioFiles\\{phrase['phraseIndex']}.wav")
    engine.runAndWait()
    engine.stop()

    audio_file = AudioSegment.from_file(
        f"E:\\Dev Workspace\\personal\\audioactr\\backend\\audioFiles\\{phrase['phraseIndex']}.wav", format="mp3")
    audio_segments.append(audio_file)
    output_file = AudioSegment.empty()
    for audio_segment in audio_segments:
        output_file += audio_segment

    # # Export the concatenated audio file as an MP3
    output_file.export("backend\\convertedFiles\\output.mp3", format="mp3")


@app.route("/convert-text-to-audio", methods=['POST'])
def convertTextToAudio():
    # Initialize the pyttsx3 engine
    data = json.loads(request.data)
    convertAudioToMp3(data)
    clean_folder("E:\\Dev Workspace\\personal\\audioactr\\backend\\audioFiles")
    return jsonify("Completed")


@app.route("/convert-single-phrase-to-audio", methods=['POST'])
def convertSinglePhraseToAudio():
    # Initialize the pyttsx3 engine
    data = json.loads(request.data)
    handleConvertSinglePhraseToMp3(data)
    clean_folder("E:\\Dev Workspace\\personal\\audioactr\\backend\\audioFiles")
    return jsonify("Completed")


@app.route('/get-audio-file')
def getAudioFile():
    # Replace this with the path to your MP3 file
    audio_file = 'E:\\Dev Workspace\\personal\\audioactr\\backend\\convertedFiles\\output.mp3'
    return send_file(audio_file, as_attachment=True)


def clean_folder(folder_path):
    # Get a list of all files in the folder
    files = os.listdir(folder_path)
    app.logger.info(files)
    # Loop through each file and delete it
    for file in files:
        file_path = os.path.join(folder_path, file)
        try:
            os.remove(file_path)
            print(f"File '{file}' has been removed.")
        except Exception as e:
            print(f"Failed to remove file '{file}': {str(e)}")


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
