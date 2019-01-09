# About Docker Deployment

These steps are made only one time on unprepared server.

## INSTALL DOCKER

```
apt-get update

apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

apt-key fingerprint 0EBFCD88

add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

apt-get update

apt-get install docker-ce

```


## INSTALL DOCKER COMPOSE

```
curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
```

## ENABLE NGINX

```
git clone https://github.com/evertramos/docker-compose-letsencrypt-nginx-proxy-companion.git

cd docker-compose-letsencrypt-nginx-proxy-companion

mv .env.sample .env

# change
# NGINX_FILES_PATH=/root/nginx/data
sed -i 's/^NGINX_FILES_PATH=.*/NGINX_FILES_PATH=\/root\/nginx\/data/g' .env

./start.sh
```

## Using docker compose locally

    docker-compose -f docker-compose-local.yml up
