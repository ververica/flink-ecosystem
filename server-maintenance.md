#Server Maintenance

## Initial setup

Docker:

```
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER # login in again
cp .env.example .env
// edit .env
docker-compose up -d
```


nginx / Let's encrypt:
(from https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)

```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/conf.d/flink-packages.org.conf
sudo certbot --nginx -d flink-packages.org -d www.flink-packages.org
sudo crontab -e

add:
0 12 * * * /usr/bin/certbot renew --quiet


# configure log rotation (GDPR 30 days retention)
sudo nano /etc/logrotate.d/nginx

add: (consider removing --verbose)
14 * * * * logrotate /etc/logrotate.d/nginx --state /home/robert/logrotate-state --verbose

```

db backups
