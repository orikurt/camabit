FROM python:3.6

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
# ADD . /app

RUN apt-get update && \
    apt-get install -y sudo && \
    apt-get install -y curl && \
    apt-get install -y git && \
    curl -sL https://deb.nodesource.com/setup_8.x  | sudo -E bash - && \
    apt-get -y install nodejs

RUN git clone https://github.com/orikurt/camabit.git
WORKDIR camabit/client
RUN npm install && \
    npm install -g @angular/cli --unsafe && \
    ng build --prod

WORKDIR /app/camabit

RUN pip3 install -r venv_packages.txt
RUN apt-get install -y nginx && \
    ln -s /app/camabit/nginx.conf /etc/nginx/sites-enabled/camabit && \
    nginx

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5 && \
    echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.6 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list && \
    apt-get update && \
    apt-get install -y mongodb-org
RUN mkdir /data && mkdir /data/db && mongod &

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV ENV production

# Run app.py when the container launches
#RUN export PYTHONPATH="${PYTHONPATH}:/app/camabit"
#ENTRYPOINT ["python3", "app/server/web_server.py", "-m"]
#ENTRYPOINT ["python3", "-V"]
ENTRYPOINT ["/bin/bash"]
