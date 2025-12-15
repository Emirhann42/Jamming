const clientId = "fa5c59f0c6414137aef546d6f6a694f9";
const redirectUri = "http://127.0.0.1:5173/";
const scope = "playlist-modify-private playlist-modify-public";

let accessToken = null;

function generateRandomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => possible[x % possible.length])
    .join("");
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64encode(input) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function redirectToSpotifyAuth() {
  const codeVerifier = generateRandomString(128);
  localStorage.setItem("code_verifier", codeVerifier);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.search = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  window.location.href = authUrl.toString();
}

async function getAccessTokenFromCode(code) {
  const codeVerifier = localStorage.getItem("code_verifier");

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await response.json();

  accessToken = data.access_token;
  localStorage.setItem("access_token", accessToken);

  window.history.replaceState({}, document.title, "/");
  return accessToken;
}

const Spotify = {
  async getAccessToken() {
    if (accessToken) return accessToken;

    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      accessToken = storedToken;
      return accessToken;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      return await getAccessTokenFromCode(code);
    } else {
      await redirectToSpotifyAuth();
    }
  },

  async search(input) {
    const token = await this.getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        input
      )}&type=track&limit=5`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const json = await response.json();
    if (!json.tracks) return [];

    return json.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async createPlaylist(name) {
    const token = await this.getAccessToken();

    const userRes = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await userRes.json();

    const res = await fetch(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    const data = await res.json();
    return data.id;
  },

  async addTracksToSpotify(playlistId, uriArray) {
    const token = await this.getAccessToken();

    await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: uriArray }),
      }
    );
  },
};

export default Spotify;
