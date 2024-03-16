export async function GET() {
  try {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sohdas&api_key=${process.env.LASTFM_API_KEY}&format=json`);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed to communicate with last.fm API'})
  }
}