const clientId = "fa5c59f0c6414137aef546d6f6a694f9";
const redirectUri = "http://localhost:5173/";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const tokenInUrl = window.location.href.match(/access_token=([^&]*)/);
    const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenInUrl && expiresInUrl) {
      accessToken = tokenInUrl[1];
      const expiresIn = Number(expiresInUrl[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-modify-private playlist-modify-public`;
      window.location = accessUrl;
    }
  },

  async search(input) {
    const accessToken = this.getAccessToken();
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${input}&type=track&limit=5`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!response.ok) {
        throw new Error("Error: ");
      }

      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map((track) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        };
      });
    } catch (error) {
      console.log(error);
    }
  },

  async createPlaylist(playlistName) {
    const accessToken = this.getAccessToken();
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      throw new Error(
        `Error getting user ID: ${
          errorData.error?.message || userResponse.statusText
        }`
      );
    }

    const userData = await userResponse.json();
    const userId = userData.id;
    const requestData = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistName,
      }),
    };

    try {
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        requestData
      );
      const data = await playlistResponse.json();

      if (!playlistResponse.ok) {
        throw new Error(
          `Error: ${data.error?.message || playlistResponse.statusText}`
        );
      }
      let id = data.id;
      return id;
    } catch (error) {
      console.log(error);
    }
  },

  async addTracksToSpotify(id, uriArray) {
    const accessToken = this.getAccessToken();
    const postData = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: uriArray,
      }),
    };

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        postData
      );
    } catch (error) {}
  },
};

export default Spotify;
