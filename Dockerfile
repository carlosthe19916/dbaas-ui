# Builder image
FROM registry.access.redhat.com/ubi9/nodejs-18:latest as builder

WORKDIR /workspace/
USER 0
RUN mkdir -p /workspace/
COPY . /workspace/
RUN npm install && npm run build-community
USER 1001

# Runner image
FROM registry.access.redhat.com/ubi9/nginx-122:latest

USER 0
COPY --from=builder /workspace/nginx.conf.template ./
COPY --from=builder /workspace/dist /tmp/src/
RUN chown -R 1001:0 /tmp/src
USER 1001

LABEL name="trustification/spog-ui" \
      description="Trustification for Spog - User Interface" \
      help="For more information visit https://trustification.io" \
      license="Apache License 2.0" \
      maintainer="gdubreui@redhat.com,ibolton@redhat.com" \
      summary="Trustification for Spog - User Interface" \
      url="https://quay.io/trustification/spog-ui" \
      usage="podman run -p 80 -v trustification/spog-ui:latest" \
      com.redhat.component="trustification-spog-ui-container" \
      io.k8s.display-name="spog-ui" \
      io.k8s.description="Trustification for Spog - User Interface" \
      io.openshift.expose-services="80:http" \
      io.openshift.tags="operator,trustification,ui,nodejs18" \
      io.openshift.min-cpu="100m" \
      io.openshift.min-memory="350Mi"

# Let the assemble script to install the dependencies
RUN /usr/libexec/s2i/assemble

# Set environment variables
COPY --from=builder /workspace/entrypoint.sh ./
ENTRYPOINT ["./entrypoint.sh"]

CMD /usr/libexec/s2i/run
