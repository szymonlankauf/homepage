#!/bin/bash

if [[ "$CIRCLE_BRANCH" == "master" ]]; then

    set -e

    echo $SSH_USER;
    echo $SSH_IP;

    pwd
    ls

rsync -ratlz --rsh="/usr/bin/sshpass -p $SSH_PASS ssh -o StrictHostKeyChecking=no -l $SSH_USER" . $SSH_USER@$SSH_IP:/root/app

sshpass -p $SSH_PASS ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_IP} << EOF
    cd ~/app;
    docker-compose up -d --build
EOF

fi
