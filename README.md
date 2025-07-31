♟️ Real-Time Multiplayer Chess Game
Play chess with friends in real-time, directly from your browser. This project uses Node.js, Socket.IO, and the powerful chess.js engine to allow two players to connect and play live, while others can spectate.


🚀 Features
Real-time multiplayer chess via Socket.IO

Accurate move validation using chess.js

Automatic player assignment (White / Black / Spectator)

Clean and mobile-responsive UI using EJS + CSS

Drag-and-drop functionality

Spectators can view live board state updates

🛠️ Tech Stack
Tech	Purpose
Node.js	Backend server
Express.js	Web framework
Socket.IO	Real-time communication (WebSocket)
chess.js	Game logic and move validation
EJS	Server-side rendering
HTML/CSS	UI layout and design

📦 Installation
bash
Copy
Edit
git clone https://github.com/your-username/realtime-chess-game.git
cd realtime-chess-game
npm install
▶️ Usage
bash
Copy
Edit
node app.js
Open your browser and go to:
http://localhost:3000

First player = White

Second player = Black

Everyone else = Spectators

📁 Project Structure
pgsql
Copy
Edit
├── public/
│   └── style.css       # UI styling
├── views/
│   └── index.ejs       # HTML with embedded JS
├── app.js              # Express + Socket.IO server
├── package.json
🧠 How It Works
On connection, players are assigned roles (White, Black, or Spectator)

Moves are validated with chess.js and synced in real-time with Socket.IO

Board updates happen instantly for all connected clients

Drag-and-drop interface enables intuitive gameplay

🔧 Future Improvements
Add game timer

Implement player usernames

Matchmaking with rooms/lobbies

Persistent game history

Mobile responsiveness

🙌 Acknowledgements
Socket.IO

Chess.js

EJS Templates
