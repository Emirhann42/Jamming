# 🎶 Jamming — Spotify Playlist Creator

**Jamming** is a React web application that lets users search for songs on Spotify, build custom playlists, and save them directly to their Spotify account.

This project was built as part of learning **React**, **API integration**, and **OAuth authentication**, and is suitable as a portfolio project.

---

## 🚀 Features

* 🔍 Search for tracks on Spotify
* ➕ Add tracks to a custom playlist
* ➖ Remove tracks from the playlist
* 💾 Save playlists directly to your Spotify account
* 🔐 Secure authentication using Spotify OAuth

---

## 🛠️ Tech Stack

* **React**
* **JavaScript**
* **CSS**
* **Spotify Web API**
* **OAuth 2.0**
* **Vite**

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Emirhann42/Jamming.git
cd Jamming
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Spotify App

* Go to the **Spotify Developer Dashboard**
* Create a new application
* Add the following Redirect URI:

```
http://127.0.0.1:5173/
```

### 4. Environment variables

Create a `.env` file in the root directory and add:

```env
VITE_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
VITE_REDIRECT_URI=http://127.0.0.1:5173/
```

### 5. Run the application

```bash
npm run dev
```

---

## 🧠 Usage

1. Open the app in your browser
2. Log in with your Spotify account
3. Search for songs by title or artist
4. Add tracks to your playlist
5. Save the playlist to Spotify
