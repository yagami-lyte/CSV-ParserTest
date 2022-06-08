FROM cypress/browsers:node16.13.2-chrome100-ff98

RUN apt-get --allow-releaseinfo-change update && apt-get install -y openjdk-11-jre

# FROM  --platform=linux/amd64  eclipse-temurin:17-jre-alpine

# COPY build/libs/csv-parser-srijan-1.0-SNAPSHOT.jar csv-parser-srijan-1.0-SNAPSHOT.jar

# CMD java -jar -Dserver.port=$PORT csv-parser-srijan-1.0-SNAPSHOT.jar



