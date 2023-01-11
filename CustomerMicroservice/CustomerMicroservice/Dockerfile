#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 5000:5000

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["CustomerMicroservice/CustomerMicroservice.csproj", "CustomerMicroservice/"]
RUN dotnet restore "CustomerMicroservice/CustomerMicroservice.csproj"
COPY . .
WORKDIR "/src/CustomerMicroservice"
RUN dotnet build "CustomerMicroservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CustomerMicroservice.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CustomerMicroservice.dll"]