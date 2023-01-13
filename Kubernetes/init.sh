#!/bin/bash


echo "Initializing databases..."

echo "helm install --values mysql-book-value.yml books-mysql bitnami/mysql"
helm install --values mysql-book-value.yml books-mysql bitnami/mysql

echo "helm upgrade --values mysql-book-value.yml books-mysql bitnami/mysql"
helm upgrade --values mysql-book-value.yml books-mysql bitnami/mysql

sleep 30

echo "helm install --values mysql-customer-value.yml customers-mysql bitnami/mysql"
helm install --values mysql-customer-value.yml customers-mysql bitnami/mysql

echo "helm upgrade --values mysql-customer-value.yml customers-mysql bitnami/mysql"
helm upgrade --values mysql-customer-value.yml customers-mysql bitnami/mysql


sleep 30

echo "helm install --values mongodb-borrow-value.yml borrows-mongodb bitnami/mongodb"
helm install --values mongodb-borrow-value.yml borrows-mongodb bitnami/mongodb

echo "helm upgrade --values mongodb-borrow-value.yml borrows-mongodb bitnami/mongodb"
helm upgrade --values mongodb-borrow-value.yml borrows-mongodb bitnami/mongodb


sleep 30

echo "helm install --values rabbitmq-notification-value.yml notifications-rabbit bitnami/rabbitmq"
helm install --values rabbitmq-notification-value.yml notifications-rabbit bitnami/rabbitmq

echo "helm upgrade --values rabbitmq-notification-value.yml notifications-rabbit bitnami/rabbitmq"
helm upgrade --values rabbitmq-notification-value.yml notifications-rabbit bitnami/rabbitmq

sleep 30
echo "Databases initialized!"

echo "------------------------------------------------"

echo "Initializing microservices..."

echo "kubectl apply -f book-ms.yml"
kubectl apply -f book-ms.yml

sleep 30

echo ""
echo "kubectl apply -f customer-ms.yml"
kubectl apply -f customer-ms.yml

sleep 30

echo ""
echo "kubectl apply -f borrowing-ms.yml"
kubectl apply -f borrowing-ms.yml

sleep 30

echo ""
echo "kubectl apply -f aggregator-ms.yml"
kubectl apply -f aggregator-ms.yml

sleep 30

echo "kubectl apply -f notification-ms.yml"
kubectl apply -f notification-ms.yml

echo ""
echo "Microservices initialized!"

echo "------------------------------------------------"

echo "Use kubectl get all to check the state of the pods"
echo "To be ready it will take 1-2 minutes"