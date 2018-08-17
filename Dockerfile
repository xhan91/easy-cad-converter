FROM node:8.11.3

ADD package.json /opt
ADD package-lock.json /opt
ADD app.js /opt
ADD bin/ /opt/bin
ADD data/ /opt/data
ADD fe/ /opt/fe
ADD routes/ /opt/routes
ADD run.sh /opt

RUN cd /opt && npm install
RUN cd /opt/fe && npm install && npm run build

RUN mkdir -p /root/log
RUN chmod +x /opt/run.sh

CMD /opt/run.sh
