#!/bin/bash

# chmod +x deploy.sh

gcloud auth configure-docker && \
gcloud builds submit --config=cloudbuild-socket-bun.yaml & \
gcloud builds submit --config=cloudbuild.yaml
