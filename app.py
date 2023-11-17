from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import soundfile as soundfile
import pickle
import os, glob, pickle
from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv1D, MaxPooling1D

app = Flask(__name__)
CORS(app)
def extract_feature(file_name, mfcc, chroma, mel):
    with soundfile.SoundFile(file_name) as sound_file:
        X = sound_file.read(dtype="float32")
        sample_rate = sound_file.samplerate
        result = np.array([])
        
        if mfcc:
            mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T, axis=0)
            result = np.hstack((result, mfccs))
        
        if chroma:
            stft = np.abs(librosa.stft(y=X))
            chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis=0)
            result = np.hstack((result, chroma))
        
        if mel:
            mel = np.mean(librosa.feature.melspectrogram(y=X, sr=sample_rate).T, axis=0)
            result = np.hstack((result, mel))
        
    return result


def model_load(sp):
    with open('CNN_m8.sav', 'rb') as file:
        model1 = pickle.load(file)
    feature = extract_feature(sp, mfcc=True,chroma= True, mel=True)
    feature=feature.reshape(1,-1)

    prediction = model1.predict(feature)
    predicted_index = np.argmax(prediction)
    observed_emotions=['calm','happy','sad','angry', 'fearful']
    predicted_emotion = observed_emotions[predicted_index]
    return(predicted_emotion)

@app.route('/predict_emotion', methods=['POST'])
def emotion():
    #if 'audio_file' not in request.files:
     #   return jsonify({'error': 'No audio file found'}), 400
    print('Hello')
    audio_file = request.files['audio_file']
    if audio_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        audio_file.save('myaudio/' + audio_file.filename)  # Save the uploaded audio file in the 'myaudio' folder
        predict=model_load('./myaudio/' + audio_file.filename)
        # Process the audio file, perform prediction, etc. (Add your logic here)
        
        # Return a response
        return jsonify(predict), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)