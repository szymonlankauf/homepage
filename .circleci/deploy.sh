#!/bin/bash

if [[ "$CIRCLE_BRANCH" == "master" ]]; then

    set -e

    echo $SSH_USER;
    echo $SSH_IP;

    pwd
    ls

sshpass -p $SSH_PASS rsync -ratlz . $SSH_USER@$SSH_IP:/root/app

sshpass -p $SSH_PASS ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_IP} << EOF
    cd ~/app;
    docker-compose up -d --build
EOF

fi
