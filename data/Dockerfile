 # base image
FROM python:3.9.16

# set the working directory
WORKDIR /app

# copy the dependencies file to the working directory
COPY requirements.txt .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy the content of the local src directory to the working directory
COPY . .

# expose port 5000
EXPOSE 5000

# command to run on container start
CMD [ "python3", "app.py", "run"]