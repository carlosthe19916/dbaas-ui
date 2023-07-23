FROM node:18-alpine AS builder
WORKDIR /workspace/
RUN mkdir -p /workspace/ && \
    apk add --no-cache git
COPY . /workspace/
RUN npm ci && \
    npm run build-community

##

FROM registry.access.redhat.com/ubi9/nginx-122:latest

USER 0
COPY --from=builder /workspace/nginx.conf.template ./
COPY --from=builder /workspace/dist /tmp/src/
RUN chown -R 1001:0 /tmp/src
USER 1001

# Let the assemble script to install the dependencies
RUN /usr/libexec/s2i/assemble

# Set environment variables
COPY --from=builder /workspace/entrypoint.sh ./
ENTRYPOINT ["./entrypoint.sh"]

CMD /usr/libexec/s2i/run
