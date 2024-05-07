#!/bin/bash

# chmod +x deploya-all.sh

gcloud auth configure-docker && \
gcloud builds submit --config=cloudbuild-socket-bun.yaml & \
gcloud builds submit --config=cloudbuild.yaml
