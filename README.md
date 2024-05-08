# Deezcord - Discord clone in React

Deezcord is an online chat application and Discord clone developed using React, Next.js, and Socket.io. It utilizes databases such as MongoDB + Prisma ORM and Google Cloud Storage, and is deployed into Docker containers on Cloud Run microservices.

The application enables real-time messaging and file storage, with authentication provided by Next-Auth v5. It is designed with inspiration from Discord's interface.

Live: <https://deezcord-zpxm4cwxta-as.a.run.app>

## Screenshots

<details>
    <summary> Click to expand </summary>

![ss1](../assets/images/ss1.png?raw=true)
![ss2](../assets/images/ss2.png?raw=true)
![ss3](../assets/images/ss3.png?raw=true)
![ss4](../assets/images/ss4.png?raw=true)

</details>

## Features

User Authentication

* Register
* Login

Messages

* Send, edit, delete, chat and images or files
* Preview sending and sent images
* Realtime server's channels messaging
* Realtime direct messaging

User Management

* List friends & pending friend request
* Send, Accept, Decline friend request
* Display user's profile
* Change user's profile (display name, profile photo, description)

Server and Channels

* Server creation, edit, deletion, and invite link
* Channel creation, edit, and deletion
* Change server's name and photo
* Change channels's name

Member Management

* List all members
* Display members profile
* Change member role (owner, admin, moderator, guest)
* Kick member

and more

## How it works

<details>
    <summary> Click to expand </summary>

![diagrams](../assets/images/diagrams.png?raw=true)

</details>

## Getting Started

Follow the instructions below:

1. Clone the repository

   ```bash
   git clone https://github.com/hasferrr/discord-clone.git
   ```

1. Install dependencies

   I am using [Bun](https://bun.sh/)

   ```bash
   bun i
   cd socket-io/
   bun i
   ```

1. Configure Google Cloud Storage

   1. Create, download, and place Service Account key file in the `/service-accounts` directory

   2. Create a cloud storage bucket

   3. Make it public accessible (by giving Storage Object Getter role to `allUsers` principal)

   4. Add role to service account:

      * Storage Object Creator role

         <details>
            <summary> Click to expand </summary>

        ![sa](../assets/images/sa.png?raw=true)

         </details>

      * `storage.buckets.update` **custome role**

         <details>
            <summary> Click to expand </summary>

        ![sa2](../assets/images/sa2.png?raw=true)

         </details>

1. Configure MongoDB database

    1. Create MongoDB Database: <https://cloud.mongodb.com>
    1. Get MongoDB URI: <https://www.mongodb.com/basics/mongodb-connection-string>

1. Add environment variables to `.env` (similiar to `.env.example` and all required)

1. Start the application

   ```bash
   # terminal 1
   bun dev

   # terminal 2
   cd socket-io/
   bun dev
   ```

## Deployment

1. You need to Configure Google Cloud Storage and Configure MongoDB database
1. Set Next.js to port 3000 and Socket.io to port 3001
1. Select deploy to Docker, Cloud Run, or deploy it yourself

### Using Docker

```bash
docker compose up -d
```

### Deploy to Cloud Run

Documentation: [Deploying to Cloud Run using Cloud Build](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run)

1. Install and configure [Cloud SDK](https://cloud.google.com/sdk/docs/install-sdk)
1. Login to your Google Cloud account
1. Enable Cloud Run Admin role to Cloud build

   > you can always see how to do it here: [Deploying to Cloud Run using Cloud Build](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run#required_iam_permissions)

1. Deploy it

   1. Using Cloud Console
      1. Manually push the containerized Next.js and Socket.io apps to Artifact Registry
      1. Deploy it to Cloud Run

   1. Using script

      1. Configure the deployment in the `cloudbuild.yaml` and `cloudbuild-socket-bun.yaml` files
      1. Execute the script

         ```bash
         chmod +x deploy-all.sh
         ./deploy-all.sh
         ```

1. Copy the published URLs, add those to `.env`
1. Redeploy it
