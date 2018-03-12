#!/bin/bash

if [[ "$CIRCLE_BRANCH" == "master" ]]; then

    set -e

echo $SSH_USER;
echo $SSH_IP;

pwd
ls

#sshpass -p $SSH_PASS ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_IP} << EOF
#    mkdir -p app; cd ~/app;
#
#    docker-compose up -d --build
#EOF





fi
