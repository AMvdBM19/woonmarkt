# 🏠 WoonMarkt – Setup Guide

> For colleagues who are not familiar with development. Just follow these steps in order!

---

## What you need before starting

- The project folder (already cloned ✅)
- The **MongoDB connection key** (from Andres)
- The **OpenAI API key** (from Andres)
- [Node.js](https://nodejs.org/) installed on your computer (version 18 or higher)
  - To check: open a terminal and type `node -v` — if you see a version number, you're good!

---

## Step 1 – Fill in the `.env` file

1. Open the project folder in your file explorer
2. Go into the **`backend`** folder
3. Find the file called **`.env`**
   > ⚠️ If you can't see it, make sure hidden files are visible. On Mac: press `Cmd + Shift + .` in Finder. On Windows: in File Explorer, go to View → Show → Hidden items.
4. Open `.env` with any text editor (Notepad, TextEdit, VS Code, etc.)
5. You'll see something like this:

   ```
   PORT=3001
   MONGO_URI=mongodb+srv://<username>:<password>@...
   JWT_SECRET=your_jwt_secret_here
   OPENAI_API_KEY=your_openai_key_here
   ```

6. Replace the values:
   - **`MONGO_URI`** → paste the MongoDB key Andres gave you (replace the whole line after the `=`)
   - **`OPENAI_API_KEY`** → paste the OpenAI key Andres gave you
   - **`JWT_SECRET`** → type any random string of letters and numbers (e.g. `mysecretkey123`) — this just needs to be something, it doesn't matter what
   - Leave `PORT=3001` as-is
7. **Save the file**

---

## Step 2 – Open two terminal windows

You need to run two things at the same time: the **backend** (the server) and the **frontend** (the website).

**How to open a terminal:**
- **Mac:** Press `Cmd + Space`, type `Terminal`, hit Enter
- **Windows:** Press the Windows key, type `cmd` or `PowerShell`, hit Enter

Open **two** terminal windows side by side.

---

## Step 3 – Start the backend (Terminal 1)

In the **first terminal**, navigate to the backend folder and start it:

```bash
cd path/to/woonmarkt/backend
npm start
```

> 💡 Replace `path/to/woonmarkt` with the actual path to the project folder on your computer.
> For example: `cd Documents/woonmarkt/backend`

You should see:
```
Connected to MongoDB
Server running on port 3001
```

If you see those lines — the backend is running! ✅  
**Leave this terminal open.**

---

## Step 4 – Start the frontend (Terminal 2)

In the **second terminal**, go to the root project folder (NOT the backend folder) and start it:

```bash
cd path/to/woonmarkt
npm start
```

After a few seconds, your browser should automatically open at:
**http://localhost:3000**

You should see the WoonMarkt app! 🎉

---

## Troubleshooting

| Problem | What to do |
|--------|------------|
| `node: command not found` | Install Node.js from https://nodejs.org and restart your terminal |
| `Cannot connect to MongoDB` | Double-check the `MONGO_URI` in the `.env` file — make sure you pasted it correctly |
| Port 3001 already in use | Restart your computer and try again |
| The browser doesn't open automatically | Manually go to http://localhost:3000 in your browser |
| App loads but AI search doesn't work | Check that the `OPENAI_API_KEY` in `.env` is correct |

---

## Stopping the app

To stop the app, go to each terminal window and press **`Ctrl + C`**.

---

*Built with React, Node.js, Express, MongoDB, and OpenAI.*
