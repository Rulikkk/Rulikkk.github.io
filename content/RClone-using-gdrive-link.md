---
title: "How to: RClone copy files from google drive link"
cover: "https://unsplash.it/1152/300/?random?BirchintheRoses"
date: "2022-12-27"

# note, categories should be properly capitalized
category: "How-to"
tags:
    - how-to
    - RClone
    - SSH
---

When you have moved from Google Photos to a self-hosted solution, you will sometimes get Google Drive links from photographers, 
and then need to store them to your hosting. This is easy manually, when there are few files, however, this can be done with just one `rclone` command.

# TL;DR Version

```bash
# 1. Install rclone
sudo -v ; curl https://rclone.org/install.sh | sudo bash 

# 2. Config gdrive
rclone config 

# 3. View files — use it to check if all works OK
# note: ID comes from google drive link: https://drive.google.com/drive/folders/1-1Cm6W90rTXQcDxxxBPlmBxxxpU1biUx
ID="1-1Cm6W90rTXQcDxxxBPlmBxxxpU1biUx"
rclone lsf --drive-root-folder-id="$ID" gdrive: 

# 4. Copy all files to current folder
# note: good idea to run copy in "screen" or alternatives, so that it goes on if ssh disconnected
rclone copy --progress --drive-root-folder-id="$ID" gdrive: .
```

# Install Rclone

Rclone is a copy util on steroids. Many also know `rsync`; the difference is, that rclone supports copying over many-many different cloud storages. 
As you may guess, Google Drive is in the list.

### [Open Rclone official installation guide](https://rclone.org/install/) or:

Assuming, we are talking about ubuntu/debian-based server distro, that would be 

```bash
sudo apt install rclone
```

Sometimes, the apt-based installation is outdated, so you might want to use script-based install, which is<br>

```bash
sudo -v ; curl https://rclone.org/install.sh | sudo bash
```

# Setup Rclone

### [Google Drive setup guide](https://rclone.org/drive/)
### [Other setup guides](https://rclone.org/docs/#configure)
### [Setup guide for remote machine](https://rclone.org/remote_setup/)

Note: you will need to understand the "remote_setup" guide, if you're doing it via SSH, since rclone needs to "snitch" your token via browser from Google to work with Google Drive.
In a remote-ssh case, you will need to copy-paste that token to ssh-session manually.

# View & Copy files

"ID" is required, to tell GDrive which folder the data comes from. 

```
ID comes in a link: https://drive.google.com/drive/folders/1-1Cm6W90rTXQcDxxxBPlmBxxxpU1biUx
                                                        ID=1-1Cm6W90rTXQcDxxxBPlmBxxxpU1biUx
```

Before copying files, it's possible to check if all is OK by listing files which we're trying to copy:

```bash
ID="1-1Cm6W90rTXQcDxxxBPlmBxxxpU1biUx" # put ID to variable
rclone lsf --drive-root-folder-id="$ID" gdrive:
```

- `--drive-root-folder-id` will tell rclone to work not inside YOUR GDrive, but inside that folder, as if it is the root — this is just what we need.
- The `gdrive:` part suggests rclone to use GDrive, which you have configured earlier.

Once you see the required list of files, you can proceed to copying:

```bash
screen # use this so that rclone goes on if ssh gets disconnected / large list of files
rclone copy --progress --drive-root-folder-id="$ID" gdrive: .
```

Here everything is simple: 
- `--progresss` tells rclone to show something, so that we know it's working
- `.` in the end tells to copy to current folder

Note: AFAIK, rclone perfectly supports resuming copying, so you can easily restart the process without additional actions.
