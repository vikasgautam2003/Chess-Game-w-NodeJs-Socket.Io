# ♟️ Real-Time Multiplayer Chess Game

A **real-time two-player chess game** with live board synchronization using **Node.js**, **Socket.IO**, **chess.js**, and **EJS**.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Socket.IO](https://img.shields.io/badge/Socket.IO-black?logo=socket.io&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)
![Live](https://img.shields.io/badge/Real--Time-✔️-green?style=for-the-badge)

---

## 🌟 Features

✅ **Real-time multiplayer gameplay**  
✅ **Move validation** with `chess.js`  
✅ **Spectator mode** for additional users  
✅ **Drag-and-drop UI**  
✅ **Clean board layout**  
✅ **Server assigns roles automatically**

---

## 🔧 Tech Stack

| Technology   | Usage                          |
|--------------|--------------------------------|
| **Node.js**  | Backend runtime environment    |
| **Express**  | Web server                     |
| **Socket.IO**| Real-time communication        |
| **chess.js** | Game engine logic              |
| **EJS**      | Templating engine              |
| **HTML/CSS** | Frontend UI                    |

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/realtime-chess-game.git
cd realtime-chess-game
npm install



## ▶️ Running the App

```bash
node app.js

Then visit:

👉 http://localhost:3000

👤 First visitor  → White Player  
👤 Second visitor → Black Player  
👀 Others         → Spectators  


.
├── app.js              # Main server file
├── public/
│   └── style.css       # Board styling
├── views/
│   └── index.ejs       # Game UI
└── package.json


🔌 Clients are auto-assigned roles (white, black, spectator)  
✅ All moves are validated using chess.js  
📡 Socket.IO broadcasts moves in real time  
🖱️ Drag-and-drop allows intuitive interaction  
♻️ Board auto-renders after every move


⏱️ Timers per player  
🧑‍🤝‍🧑 Add usernames & lobby rooms  
📜 Move history log  
📱 Mobile responsiveness  
🔁 Undo/Redo feature


♟️ [chess.js](https://github.com/jhlywa/chess.js) — Chess game logic  
📡 [Socket.IO](https://socket.io/) — Real-time communication  
📝 [EJS](https://ejs.co/) — Server-side templating



---

Let me know if you want:
- A section for deployment on platforms like **Vercel**, **Render**, or **Glitch**
- Shields/badges (like license, built with, etc.)
- License or contribution section

Want me to save and send this as a downloadable `README.md` file?



