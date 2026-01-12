# QAautoMATER On-Premises Setup Guide

**QAautoMATER** is an AI-powered, scriptless test automation and test management platform designed to simplify and accelerate end-to-end quality assurance for modern software teams. It helps teams move away from manual spreadsheets and complex automation frameworks by providing a single, unified solution for:

* Test case management
* Test execution
* Defect tracking
* Automation for Web, Mobile, and API

This guide explains how to install, start, and manage QAautoMATER on-premises using the provided compiled backend and frontend.

---

## 1️⃣ System Requirements

* **Node.js v18–20** — [Download & Install](https://nodejs.org/en/download) using your system installer
* **PM2 (Process Manager)** — Install globally via npm:

```bash
npm install -g pm2
```

---

## 2️⃣ Setup Option 1: Using Direct Installer

The repository includes an installer that automatically installs and starts QAautoMATER.

1. Run the installer by double-clicking it. You will see the following screen:

<img width="626" height="483" alt="Installer Screen" src="https://github.com/user-attachments/assets/24e9ee1b-f667-4ddf-86f7-4ede43137508" />

2. After installation, you will see the follow-up screen:

<img width="1098" height="792" alt="Post-Installation Screen" src="https://github.com/user-attachments/assets/33958f44-7b4f-46f5-8665-a0679f342f3f" />

Here, you can:

* Select the **installation location** (choose a new folder for repository and data storage)
* Specify the **application port** (optional)

All dependencies will be automatically downloaded, and QAautoMATER will launch on the selected port.

---

## 3️⃣ Setup Option 2: Using Git Clone or Existing Folder Structure

Clone the QAautoMATER repository. After cloning, you will get the following structure:

```
QAautoMATER
├── ui
│   └── build               # React production build
├── backend
│   ├── server.js           # Compiled backend
│   ├── package.json        # Runtime dependencies only
│   ├── routes/             # Compiled backend routes
│   ├── qaautomater-cert.pfx or qaautomater-cert.crt
│   └── passphrase.txt or qaautomater.com_key.txt  # Optional
├── dataHub                 # Static files required by backend
└── ecosystem.config.js     # PM2 configuration
```

### Install Dependencies

From the backend folder, run:

```bash
cd QAautoMATER/backend
npm install
```

### Start QAautoMATER Using PM2

> **Note:** If you want to change the application port, update `ecosystem.config.js` before starting.

```bash
cd ..
pm start ecosystem.config.js
```

### Access QAautoMATER

Open a browser and go to:

```
https://<server-ip>:<PORT>
```

**Examples:**

* `https://localhost:3001`
* `https://qaautomater.company.com:3001`

---

## 4️⃣ Managing QAautoMATER with PM2

| Action    | Command                         |
| --------- | ------------------------------- |
| Start app | `pm2 start ecosystem.config.js` |
| Stop app  | `pm2 stop ecosystem.config.js`  |
| View logs | `pm2 logs ecosystem.config.js`  |

---

## 5️⃣ SSL Certificate Notes

* SSL is handled by the backend (`server.js`)
* Browsers may show a warning if using a self-signed certificate
* Optionally, install the certificate in the trusted store or replace it with a corporate certificate

---

## 6️⃣ Troubleshooting

* **Cannot open UI:** Check PM2 status and ensure the port is open
* **App stops after reboot:** Run `pm2 save` (Windows users may also configure Task Scheduler with `pm2 resurrect`)
* **Logs grow too large:** Install PM2 log rotation:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

---

## 7️⃣ Upgrade Procedure (Future Releases)

1. Stop PM2:

```bash
pm2 delete ecosystem.config.js
```

2. Update backend dependencies:

```bash
cd backend
npm install
cd ..
```

3. Restart QAautoMATER:

```bash
pm2 start ecosystem.config.js
```

---

> QAautoMATER provides a streamlined, enterprise-ready solution for managing test cases, executing scripts, and tracking defects—all from a single, on-premises platform.
