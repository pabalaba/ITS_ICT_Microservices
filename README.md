# ITS_ICT_Microservices

### Name: Pietro

### Surname: Chiartano

### Date: 2022-2023

--------------------------------------------

## Index
- #### [**Architecture**](#architecture-1)
- #### [**Relations**](#relations-1)
- #### [**Tech Stack**](#tech-stack-1)
- #### [**Requirements**](#requirements-1)
- #### [**Project Tree**](#project-tree-1)

--------------------------------------------

### Architecture ###

![](Doc/architettura.png)

*Legend*
Green Square: Kubernetes
Yellow Square: Pod
Gear: Microservice
Cilinder: Database


### Relations ###

|                          	| Book                               	| Borrow                                                   	| Customer                  	|
|--------------------------	|------------------------------------	|----------------------------------------------------------	|---------------------------	|
| Business<br>Requirements 	| Manage the books                   	| Manage the orders                                        	| Manage the customers      	|
| Functional               	| Add,Remove,Update,<br>Get,Quantity 	| Add,Remove,Update,<br>Get,Return                         	| Add,Remove,Update,<br>Get 	|
| Data Entities            	| Books                              	| Borrows                                                  	| Customers                 	|
| Data<br>Autonomy         	| None                               	| Related to book <br>by ID<br>Related to customer<br>by ID 	| None                      	|



### Tech Stack ###

Book Microservice:
- Java - Spring
- MySQL

Customer Microservice:
- C# - .NET Core 3.1
- MySQL

Borrow Microservice:
- NodeJS
- TypeScript
- ExpressTS
- RabbitMQ
- MongoDB

Aggregator Microservice:
- NodeJS
- TypeScript
- ApolloGQL - GraphQL

Notification Microservice:
- Java - Spring
- RabbitMQ

### Requirementes ###

- Docker
- Minikube
- Helm
- Kubectl

Application tested with 4096MB of RAM.

--------------------------------------------

The first step is starting Minikube
```sh
# minikube delete

minikube start --memory 4096
```

The second step is to add the bitnami repository to helm
```sh
helm repo add bitnami https://charts.bitnami.com/bitnami

helm repo update
```

The last step, after minikube started, is
```sh
chmod +x init.sh

./init.sh
```

Fix to "Context deadline exceeded"
```sh
minikube ssh docker pull repo/image:version
```

### Project Tree ###
```sh
+---.github
|   \---workflows
+---.idea
+---.vscode
+---AggregatorMicroservice
|   \---src
|       +---entities
|       +---resolvers
|       \---utils
+---BookMicroservice
|   +---.apt_generated_tests
|   +---.idea
|   +---.mvn
|   |   \---wrapper
|   +---src
|   |   +---main
|   |   |   +---java
|   |   |   |   \---chr
|   |   |   |       \---ptr
|   |   |   |           \---bookmicroservice
|   |   |   |               +---dao
|   |   |   |               +---entities
|   |   |   |               +---exceptions
|   |   |   |               +---integration
|   |   |   |               +---services
|   |   |   |               \---swagger
|   |   |   \---resources
|   |   \---test
|   |       \---java
|   |           \---chr
|   |               \---ptr
|   |                   \---bookmicroservice
|   \---target
|       +---classes
|       |   \---chr
|       |       \---ptr
|       |           \---bookmicroservice
|       |               +---dao
|       |               +---entities
|       |               +---exceptions
|       |               +---integration
|       |               +---services
|       |               \---swagger
|       +---generated-sources
|       |   \---annotations
|       +---generated-test-sources
|       |   \---test-annotations
|       +---maven-archiver
|       +---maven-status
|       |   \---maven-compiler-plugin
|       |       +---compile
|       |       |   \---default-compile
|       |       \---testCompile
|       |           \---default-testCompile
|       \---test-classes
|           \---chr
|               \---ptr
|                   \---bookmicroservice
+---BorrowingMicroservice
|   +---build
|   |   +---controllers
|   |   +---database
|   |   +---entities
|   |   +---middlewares
|   |   +---rabbitmq
|   |   \---services
|   \---src
|       +---controllers
|       +---database
|       +---entities
|       +---middlewares
|       +---rabbitmq
|       \---services
+---CustomerMicroservice
|   +---.vs
|   |   +---CustomerMicroservice
|   |   |   +---config
|   |   |   +---DesignTimeBuild
|   |   |   +---FileContentIndex
|   |   |   |   \---merges
|   |   |   +---v16
|   |   |   \---v17
|   |   +---ProjectEvaluation
|   |   \---sd
|   \---CustomerMicroservice
|       +---bin
|       |   +---Debug
|       |   |   \---netcoreapp3.1
|       |   |       +---cs
|       |   |       +---de
|       |   |       +---es
|       |   |       +---fr
|       |   |       +---it
|       |   |       +---ja
|       |   |       +---ko
|       |   |       +---pl
|       |   |       +---pt-BR
|       |   |       +---ru
|       |   |       +---runtimes
|       |   |       |   +---unix
|       |   |       |   |   \---lib
|       |   |       |   |       +---netcoreapp2.0
|       |   |       |   |       \---netcoreapp2.1
|       |   |       |   +---win
|       |   |       |   |   \---lib
|       |   |       |   |       +---netcoreapp2.0
|       |   |       |   |       +---netcoreapp2.1
|       |   |       |   |       \---netstandard2.0
|       |   |       |   +---win-arm64
|       |   |       |   |   \---native
|       |   |       |   +---win-x64
|       |   |       |   |   \---native
|       |   |       |   \---win-x86
|       |   |       |       \---native
|       |   |       +---tr
|       |   |       +---zh-Hans
|       |   |       \---zh-Hant
|       |   \---Release
|       |       \---netcoreapp3.1
|       +---Controllers
|       +---Data
|       +---Helpers
|       +---Models
|       +---obj
|       |   +---Container
|       |   +---Debug
|       |   |   \---netcoreapp3.1
|       |   |       \---staticwebassets
|       |   \---Release
|       |       \---netcoreapp3.1
|       +---Properties
|       +---Services
|       |   \---Interfaces
|       \---Tracing
+---Doc
+---Kubernetes
\---NotificationMicroservice
    +---.idea
    +---.mvn
    |   \---wrapper
    +---src
    |   +---main
    |   |   +---java
    |   |   |   \---chr
    |   |   |       \---ptr
    |   |   |           \---notification
    |   |   |               +---configs
    |   |   |               \---services
    |   |   \---resources
    |   \---test
    |       \---java
    |           \---chr
    |               \---ptr
    |                   \---notification
    \---target
        +---classes
        |   \---chr
        |       \---ptr
        |           \---notification
        |               +---configs
        |               \---services
        +---generated-sources
        |   \---annotations
        +---generated-test-sources
        |   \---test-annotations
        \---test-classes
            \---chr
                \---ptr
                    \---notification
```