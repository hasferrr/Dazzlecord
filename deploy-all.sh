#!/bin/bash

# chmod +x deploy-all.sh

gcloud auth configure-docker && \
screen -S bun -d -m bash -c "gcloud builds submit --config=cloudbuild-socket-bun.yaml; exec bash" && \
gcloud builds submit --config=cloudbuild.yaml
