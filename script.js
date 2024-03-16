async function getLatestSongInfo() {
  // TODO: Replace this URL with https://soham.place/api/last_fm
  const URL = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sohdas&api_key=8a3246234d465cc6738f618f1e8a56ce&format=json"
  const response = await fetch(URL);
  const response_json = await response.json();

  const latestSong = response_json.recenttracks.track[0];
  var songTime = "";
  var songTitle = "";
  try {
      if (latestSong["@attr"].nowplaying === "true") {
          songTime = "now playing";
      }
  } catch (error) {
      songTime = latestSong.date["#text"] + " GMT";
  }
  if (latestSong.name.toLowerCase() === latestSong.album["#text"].toLowerCase()) {
      songTitle = latestSong.name;
  } else {
      songTitle = latestSong.name + " - " + latestSong.album["#text"];
  }
  const songArtist = latestSong.artist["#text"];
  const songCover = latestSong.image[3]["#text"];
  // Changing elements on website:
  latestSongCover.src = songCover;
  latestSongCover.alt = songTitle;
  latestSongTitle.innerHTML = "recently listening to <b>" + songTitle + "</b>";
  latestSongArtist.innerHTML = "by <b>" + songArtist + "</b>";
  latestSongTime.innerHTML = "at <b>" + songTime + "</b>";
  return;
}

getLatestSongInfo();