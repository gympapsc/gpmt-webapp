# Gymnasium Papenburg Miktionstagebuch Webapp

[![Deploy to Azure Web Services](https://github.com/gympapsc/gpmt-webapp/actions/workflows/deployment.yaml/badge.svg)](https://github.com/gympapsc/gpmt-webapp/actions/workflows/deployment.yaml)


### E2E test setup
```
minikube start
kubectl apply -f ./manifest/test/storage.yaml      # setup persistent volume for gpmt-mongodb and gpmt-redis
kubectl apply -f ./manifest/test/statefulsets.yaml # start gpmt-mongodb and gpmt-redis statefulset
kubectl apply -f ./manifest/deployments.yaml       # create gpmt-api
kubectl apply -f ./manifest/services.yaml          # expose gpmt-api
```
Then start the web application frontend e2e test.
```
export NEXT_PUBLIC_API_URL=http://$(minikube ip)   # export api url
npm run test:e2e
```

### Unit test setup
```
npm run test:unit
```