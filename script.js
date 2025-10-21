async function getRecentTracksLastFM() {
  try {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sohdas&api_key={process.env.LASTFM_API_KEY}&format=json`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

async function getLatestSongInfo() {
  const response_json = await getRecentTracksLastFM()

  const latestSong = response_json.recenttracks.track[0];
  let latestSongCover = document.getElementById("latest-song-cover");
  let latestSongTitle = document.getElementById("latest-song-title");
  let latestSongArtist = document.getElementById("latest-song-artist");
  let latestSongTime = document.getElementById("latest-song-time");
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
