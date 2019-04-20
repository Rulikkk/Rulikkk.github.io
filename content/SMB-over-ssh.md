---
title: "How to: SMB Over SSH"
cover: "https://unsplash.it/1152/300/?random?BirchintheRoses"
date: "2019-01-09"

# note, categories should be properly capitalized
category: "How-to"
tags:
    - how-to
    - SMB
    - SSH
---

When you have SMB (Samba) share in some local network, e.g. at home, and do not want to explicitly share it online, you can set up SSH tunnel to access that SMB share. This will allow mounting it as a usual share (you still need to know login/pass, if it's not open). SMB-over-SSH seems to be simpler that throwing DLNA/UPnP over SSH (that setup looks almost impossible, but sums up to solving UDP-over-TCP problem).

# How to

```bash
# Test you can access "gate" computer.
# That's the one with SMB share installed
# This must work =)
$ ssh user:password@gate

# Now I will simplify ssh to this:
$ ssh gate

# Throw a tunnel from your location to gate
$ ssh -nNT -L 9999:localhost:445 gate

# -nNT — do not create a shell
# -L from:host:to — creates tunnel from "host:from" and remote "to" ports
# We use local port 9999 and remote port 445 (default SMB port)
```

After this setup, share can be mounted at `smb://localhost:9999` (on a Mac). Not sure, how to mount a share on a specific port on Win, anyway, that should be solvable.

**Notes:**

-   The window, where ssh tunnel was opened, should be kept open — the tunnel lives as long as that window lives and dies, when it is closed
-   On a Mac, if share is without password, the "Guest" login should be selected

**If you have an SMB share on a separate host, than gate,** the commands should change to this.

```bash
$ ssh gate -nNT -L localhost:9999:smb-host:445
```

This command means: set up a tunnel using gate between `localhost:9999` and `smb-host:445`, assuming that `smb-host` is known and connected to `gate` (it is not required for your computer to even know/connect to `smb-host`).

Hope that helps! All those commands worked for me.
