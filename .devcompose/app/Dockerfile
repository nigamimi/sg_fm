FROM ubuntu:20.04

# update first
RUN apt-get update
# install tools used in build process
RUN apt-get install -y apt-utils
# install language pack
RUN apt-get install -y language-pack-ja-base language-pack-ja 
# install time zone data
RUN apt-get install -y tzdata

# setting to non-interactive mode
ENV DEBIAN_FRONTEND=noninteractive
# set locale
RUN locale-gen --purge "ja_JP.UTF-8" &&\
    echo 'export LANG=ja_JP.UTF-8' >> ~/.bashrc &&\
    echo 'export LANGUAGE="ja_JP:ja"' >> ~/.bashrc &&\
    . ~/.bashrc  &&\
    update-locale LANG=ja_JP.UTF-8  &&\
    dpkg-reconfigure --frontend noninteractive locales
# install xserver
RUN apt-get install -y xserver-xorg x11-apps

# install Node.js
RUN apt-get install -y curl &&\
    curl -fsSL https://deb.nodesource.com/setup_16.x | /bin/bash -&&\
    apt-get install -y nodejs &&\
    npm install --g yarn

# install electron deps
RUN apt-get install -y \
    libglib2.0-0 \
    libxshmfence1 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libgdk-pixbuf2.0-0	\
    libgtk-3-0 \
    libgbm1 \
    libasound2
# install fonts for x windows render
RUN apt-get install -y fonts-noto

RUN apt-get install -y sudo git

# creates user
RUN apt-get install
ARG UID=1020
ARG USER
ARG PASSWORD
RUN useradd -m --uid ${UID} --groups sudo ${USER} &&\
    echo ${USER}:${PASSWORD} | chpasswd
# change user
USER ${USER}

# set lang for user
RUN echo 'export LANG=ja_JP.UTF-8' >> ~/.bashrc &&\
    echo 'export LANGUAGE="ja_JP:ja"' >> ~/.bashrc &&\
    . ~/.bashrc

COPY start.sh /usr/local/bin
ENTRYPOINT ["/bin/bash", "/usr/local/bin/start.sh"]