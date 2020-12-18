# Tagging 2 times and SHA is an env variable defined in travis file
docker build -t 03004968719/vidly-client:latest -t 03004968719/vidly-client:$SHA -f ./client/Dockerfile ./client 
docker build -t 03004968719/vidly-server:latest -t 03004968719/vidly-server:$SHA -f ./server/Dockerfile ./server 

docker push 03004968719/vidly-client:latest
docker push 03004968719/vidly-server:latest

docker push 03004968719/vidly-client:$SHA
docker push 03004968719/vidly-server:$SHA

kubectl apply -f k8s 

kubectl set image deployments/server-deployment server=03004968719/vidly-server:$SHA 
kubectl set image deployments/client-deployment client=03004968719/vidly-client:$SHA 

# server-deployment is the name of server-deployment file , server=03004968719/multi-server means that in container server -- we need to run our own image with tag $SHA
# building docker images above ...
# applying kubernetes files in kubectl command