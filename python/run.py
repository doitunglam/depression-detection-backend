import sys

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

import librosa
import librosa.display
import numpy as np
import keras
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import  Flatten, Dropout, Activation
from keras.layers import Conv1D, MaxPooling1D

import pandas as pd
import librosa
if __name__ == "__main__":
    model = Sequential()

    model.add(Conv1D(128, 5,padding='same',
                    input_shape=(216,1)))
    model.add(Activation('relu'))
    model.add(Conv1D(128, 5,padding='same'))
    model.add(Activation('relu'))
    model.add(Dropout(0.1))
    model.add(MaxPooling1D(pool_size=(8)))
    model.add(Conv1D(128, 5,padding='same',))
    model.add(Activation('relu'))
    model.add(Conv1D(128, 5,padding='same',))
    model.add(Activation('relu'))
    model.add(Conv1D(128, 5,padding='same',))
    model.add(Activation('relu'))
    model.add(Dropout(0.2))
    model.add(Conv1D(128, 5,padding='same',))
    model.add(Activation('relu'))
    model.add(Flatten())
    model.add(Dense(10))
    model.add(Activation('softmax'))
    loaded_model = model

    opt = keras.optimizers.RMSprop(learning_rate=0.00001, weight_decay=1e-6)
    loaded_model.load_weights("Emotion_Voice_Detection_Model.h5")
    
    # evaluate loaded model on test data
    loaded_model.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])
    X, sample_rate = librosa.load('../storage/{}'.format(sys.argv[1])
                                  , res_type='kaiser_fast'
                                  ,duration=2.5
                                  ,sr=22050*2
                                  ,offset=0.5)
    sample_rate = np.array(sample_rate)
    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13),axis=0)
    featurelive = mfccs
    livedf2 = featurelive

    livedf2= pd.DataFrame(data=livedf2)

    livedf2 = livedf2.stack().to_frame().T

    twodim= np.expand_dims(livedf2, axis=2)

    livepreds = loaded_model.predict(twodim, 
                            batch_size=32, 
                            verbose=0)

    livepreds1=livepreds.argmax(axis=1)

    liveabc = livepreds1.astype(int).flatten()

    print(liveabc[0])
