#! /bin/bash

(trap 'kill 0' SIGINT; python ./backend/launch.py & cd frontend; npm run start)