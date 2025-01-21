# Dazzlecord - Discord clone in React

- [Dazzlecord - Discord clone in React](#dazzlecord---discord-clone-in-react)
  - [Overview](#overview)
  - [Previews](#previews)
  - [Features](#features)
  - [How it works](#how-it-works)
  - [Getting Started](#getting-started)
  - [Deployment](#deployment)
    - [Deploy to Docker](#deploy-to-docker)
    - [Deploy to Cloud Run](#deploy-to-cloud-run)

## Overview

Dazzlecord is an online chat application and Discord clone developed using React, Next.js, and Socket.io. It utilizes databases such as MongoDB + Prisma ORM and Google Cloud Storage, and is deployed into Docker containers on Cloud Run microservices.

The application enables real-time messaging and file storage, with authentication provided by Next-Auth v5. It is designed with inspiration from Discord's interface.

Live: <https://deezcord-zpxm4cwxta-as.a.run.app>

## Previews

![ss1](../assets/images/ss-mult-1.png?raw=true)
![ss2](../assets/images/ss-mult-2.png?raw=true)

## Features

User Authentication

- Register
- Login

Messages

- Send, edit, delete, chat and images or files
- Preview sending and sent images
- Realtime server's channels messaging
- Realtime direct messaging

User Management

- List friends & pending friend request
- Send, Accept, Decline friend request
- Display user's profile
- Change user's profile (display name, profile photo, description)

Server and Channels

- Server creation, edit, deletion, and invite link
- Channel creation, edit, and deletion
- Change server's name and photo
- Change channels's name

Member Management

- List all members
- Display members profile
- Change member role (owner, admin, moderator, guest)
- Kick member

and more

## How it works

<img src="../assets/images/design.png?raw=true" width="512">

<img src="../assets/images/diagrams.png?raw=true" width="512">

## Getting Started

Follow the instructions below:

1. Clone the repository

   ```bash
   git clone https://github.com/hasferrr/Dazzlecord.git
   ```

1. Install dependencies

   ```bash
   bun i
   cd socket-io/
   bun i
   ```

1. Configure Google Cloud Storage

   1. Create, download, and place Service Account key file in the `/service-accounts` directory

   1. Create a cloud storage bucket

   1. Make it public accessible

   1. Add this custom role to `allUsers` principal (in your storage bucket):

      - `resourcemanager.projects.get`
      - `storage.managedFolders.get`
      - `storage.objects.get`

      <br>
      <details>
         <summary> Click to expand </summary>
         <br>

      <img src="../assets/images/gcs-custome-role-getter.png?raw=true" width="384">

      <img src="../assets/images/gcs-all-users.png?raw=true" width="600">

      </details>

   1. Add this role to service account:

      - Storage Object Creator role

         <details>
            <summary> Click to expand </summary>
            <br>

         <img src="../assets/images/sa.png?raw=true" width="384">

         </details>

      - `storage.buckets.update` and `storage.objects.delete` **custome role**

         <details>
            <summary> Click to expand </summary>
            <br>

         <img src="../assets/images/sa2.png?raw=true" width="512">

         </details>

1. Configure MongoDB database

    1. Create MongoDB Database: <https://cloud.mongodb.com>
    1. Get MongoDB URI: <https://www.mongodb.com/basics/mongodb-connection-string>

1. Add environment variables to `.env` (similiar to `.env.example` and all required)

1. Start the application

   ```bash
   # terminal 1
   bun run dev

   # terminal 2
   cd socket-io/
   bun run dev
   ```

## Deployment

1. You need to Configure Google Cloud Storage and Configure MongoDB database
1. Set Next.js to port 3000 and Socket.io to port 3001
1. Select deploy to Docker, Cloud Run, or deploy it yourself

### Deploy to Docker

```bash
docker compose up -d
```

### Deploy to Cloud Run

You can manually deploy it using cloud console or using script (select one)

1. Using Cloud Console
   1. Push the containerized Next.js and Socket.io apps to Artifact Registry
   1. Deploy it to Cloud Run

1. Using Cloud Build

   Documentation: [Deploying to Cloud Run using Cloud Build](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run)

   1. Install and configure [Cloud SDK](https://cloud.google.com/sdk/docs/install-sdk)

      > Alternatively, you can use Cloud Shell

   1. Login to your Google Cloud account
   1. Enable Cloud Run Admin role to Cloud build

      > You can always see how to do it here: [Deploying to Cloud Run using Cloud Build](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run#required_iam_permissions)

   1. Configure the deployment in the `cloudbuild.yaml` and `cloudbuild-socket-bun.yaml` files
   1. Execute the script

      ```bash
      chmod +x deploy-all.sh
      ./deploy-all.sh
      ```

1. Copy the published URLs, add those to `.env`
1. Redeploy it

   <details>
      <summary> Click to expand </summary>
      <br>

   Alternatively, you could infer the URLs of other services by using your knowledge of the structure of Cloud Run service URLs

   <img src="../assets/images/run-url.png?raw=true" width="512">

   </details>
