#! /bin/bash

#install backend dependencies
cd backend
pip install -r requirements.txt
pip install -I git+https://github.com/DarkKronicle/SpotifyPlaylistGenerator

#install frontend dependencies
cd ../frontend
npm install