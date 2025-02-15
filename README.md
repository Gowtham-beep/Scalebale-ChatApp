# Scalable Chat App

## 🚀 Overview
This is a **Scalable Chat Application** built using **Turborepo, Node.js, Socket.io, and Redis (Aiven Valkey Service)**. The project leverages **Redis Pub/Sub** for efficient real-time communication and message distribution.

---

## 📌 Tech Stack
- **Monorepo Management**: [Turborepo](https://turbo.build/)
- **Backend**: [Node.js](https://nodejs.org/)
- **WebSockets**: [Socket.io](https://socket.io/)
- **Redis**: [Aiven Valkey (Redis) Service](https://aiven.io/valkey)
- **Redis Pub/Sub**: Used for real-time messaging

---

## 🏗 Project Structure
```
scalable-chat-app/
│── apps/
│   ├── server/    # Backend using Node.js and Socket.io
│   ├── web/       # Frontend using React and Socket.io-client
│── packages/
│   ├── shared/    # Shared utilities (if any)
│── turbo.json     # Turborepo configuration
│── package.json   # Root package.json with workspaces
│── README.md      # Documentation
```

---

## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
  git clone https://github.com/yourusername/scalable-chat-app.git
  cd scalable-chat-app
```

### 2️⃣ Install Dependencies
```sh
  npm install
```

### 3️⃣ Setup Environment Variables
Create a **.env** file in `apps/server` and configure your Redis connection:
```env
REDIS_HOST=<your-aiven-redis-host>
REDIS_PORT=<your-redis-port>
REDIS_PASSWORD=<your-redis-password>
```

### 4️⃣ Start the Development Server
```sh
  npm run dev
```
This will run both the **server** and **web** applications in parallel using Turborepo.

---

## 🔗 Redis Pub/Sub Implementation
### **Publisher (Server Side)**
The server publishes messages to a Redis channel when a user sends a message.
```js
const redis = require("redis");
const pub = redis.createClient();

dio.on("message", async (msg) => {
  await pub.publish("chat-channel", msg);
});
```

### **Subscriber (Server Side)**
Another service or instance subscribes to the Redis channel to receive messages.
```js
const sub = redis.createClient();
sub.subscribe("chat-channel");

sub.on("message", (channel, message) => {
  console.log(`Received message: ${message}`);
  io.emit("message", message);
});
```

---

## 🖥️ Usage
1. Open **two or more** browser tabs and navigate to the app.
2. Send a message from one tab.
3. The message should instantly appear in all other connected tabs via **WebSockets and Redis Pub/Sub**.

---

## 🚀 Deployment
You can deploy the backend on **Render** or **Vercel**.
```sh
npm run build
npm start
```

---

## 🤝 Contributing
1. Fork the repo.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request.

---

## ⚡ Future Improvements
- Add **user authentication**
- Implement **chat rooms**
- Store **chat history** in a database (PostgreSQL or MongoDB)
- Improve **UI design**

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

🚀 **Happy Coding!** 🎉

