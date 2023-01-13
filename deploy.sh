#!/bin/sh

docker-compose up --build -d
deprecated=$(docker images | grep '<none>' | awk '{print $3}')
if [ "$deprecated" != "" ] ; then
  docker rmi $deprecated
fi