async function getLatestSongInfo() {
  const URL = "https://soham.place/api/last_fm"
  // const URL = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sohdas&api_key=8a3246234d465cc6738f618f1e8a56ce&format=json"
  const response = await fetch(URL);
  const response_json = await response.json();

  const latestSong = response_json.recenttracks.track[0];
  var isPlaying = false;
  var songTime = "";
  var songTitle = "";
  try {
      if (latestSong["@attr"].nowplaying === "true") {
          isPlaying = true;
      }
  } catch (error) {
      songTime = latestSong.date["#text"].split(',')[0];
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
  if (!isPlaying) {
      latestSongTitle.innerHTML = "recently listening to <b>" + songTitle + "</b>";
      latestSongTime.innerHTML = "on <b>" + songTime + "</b>";
  } else {
    latestSongTitle.innerHTML = "currently listening to <b>" + songTitle + "</b>";
    latestSongTime.innerHTML = "<span class='animate-pulse text-red-500'>● </span> live";
  }
  latestSongArtist.innerHTML = "by <b>" + songArtist + "</b>";
  return;
}

getLatestSongInfo();