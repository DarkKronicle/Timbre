#! /bin/bash

#install backend dependencies
cd backend
pip install -r requirements.txt

#install frontend dependencies
cd ../frontend
npm install