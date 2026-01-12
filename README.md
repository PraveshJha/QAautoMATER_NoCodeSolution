# QAautoMATER_NoCodeSolution

QAautoMATER is an AI-powered, scriptless test automation and test management platform designed to simplify and accelerate end-to-end quality assurance for modern software teams.
It is built to help teams move away from manual spreadsheets and complex automation frameworks, offering a single, unified solution for test case management, execution, defect tracking, and automation for Web, mobile and API.

# QAautoMATER On-Prem Solution

This guide explains how to install, start, and manage **QAautoMATER** on-premises using the provided compiled backend and frontend.

---

## 1️⃣ System Requirements

* **Node.js v18+** (LTS recommended)
* **PM2** (process manager)
* One open port (default **3001**, can be changed by client)
* Windows or Linux machine

### Install PM2 (one-time)

```bash
npm install -g pm2
```

---

## 2️⃣ Folder Structure

Client will receive a folder named `QAautoMATER_OnPremSolution`:

```
QAautoMATER_OnPremSolution
├── ui
│   └── build             # React production build
├── backend
│   ├── server.js          # Compiled backend
│   ├── package.json       # Runtime dependencies only
│   ├── routes/            # Compiled backend routes
│   ├── qaautomater-cert.pfx
│   └── passphrase.txt     # Optional
├── dataHub               # Static files required by backend; keep at root
└── ecosystem.config.js    # PM2 configuration
```

**Important Notes:**

* The `dataHub` folder must remain at the **root level**, alongside `ui` and `backend`.
* Do **NOT** rename or move any folders.
* Port can be changed by editing the `PORT` variable in `ecosystem.config.js`.

---

## 3️⃣ Install Backend Dependencies

From the backend folder:

```bash
cd QAautoMATER_OnPremSolution/backend
npm install
```

* Installs runtime dependencies. Only needed again if a new backend build is provided.

---

## 4️⃣ Configure Port (Optional)

* Open `ecosystem.config.js`
* Update `PORT` if client wants a different port:

```js
env: {
  NODE_ENV: "production",
  PORT: 3001 // change as needed
}
```

* No changes are needed in backend code; `server.js` reads the port dynamically.

---

## 5️⃣ Start QAautoMATER Using PM2

Go back to the root folder:

```bash
cd ..
pm install -g pm2
pm2 start ecosystem.config.js
pm2 save
```

**Notes:**

* `pm2 save` stores the process list for auto-restart.
* On Windows, **`pm2 startup` is optional** — use Task Scheduler with `pm2 resurrect` if auto-start is required.
* On Linux, you can run `pm2 startup` to configure auto-start on reboot.

---

## 6️⃣ Access QAautoMATER

Open a browser:

```
https://<server-ip>:<PORT>
```

Examples:

* `https://localhost:3001`
* `https://qaautomater.company.com:3001`

> The port should match the value in `ecosystem.config.js`.

---

## 7️⃣ Managing QAautoMATER

| Action              | Command                            |
| ------------------- | ---------------------------------- |
| Start app           | `pm2 start QAautoMATER`            |
| Stop app            | `pm2 stop QAautoMATER`             |
| Stop all apps       | `pm2 stop all`                     |
| Restart app         | `pm2 restart QAautoMATER`          |
| Restart all apps    | `pm2 restart all`                  |
| Remove app          | `pm2 delete QAautoMATER`           |
| Remove all          | `pm2 delete all`                   |
| View logs           | `pm2 logs QAautoMATER`             |
| View last 100 lines | `pm2 logs QAautoMATER --lines 100` |
| View status         | `pm2 status`                       |

---

## 8️⃣ SSL Certificate Notes

* SSL is handled by the backend (`server.js`)
* Browser may show a warning if the certificate is self-signed
* Optionally, client can install the certificate in the trusted store or replace it with a corporate certificate

---

## 9️⃣ Troubleshooting

* **Cannot open UI:** Check PM2 status, ensure the port is open
* **App stops after reboot:** Run `pm2 save` (Windows users may need Task Scheduler with `pm2 resurrect`)
* **Logs grow too large:** Install PM2 log rotation

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

---

## 🔟 Upgrade Procedure (Future Releases)

1. Stop PM2:

```bash
pm2 stop QAautoMATER
```

2. Replace `ui/build` if frontend is updated
3. Replace `backend` folder if backend is updated
4. Install runtime dependencies:

```bash
cd backend
npm install
cd ..
```

5. Restart:

```bash
pm2 restart QAautoMATER
```

---

## ✅ Summary

* Single command installation
* Dynamic port configurable via `ecosystem.config.js`
* Relative API calls in frontend (no CORS issues)
* `dataHub` required at root level
* PM2 ensures auto-restart, log management, and monitoring

