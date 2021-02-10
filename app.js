const searchInfo = () => {
    displayNone('lyricsDiv');
    displayNone('getLyrics');
    displayNone('titleInfo');
    const searchText = document.getElementById('inputText').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySong(data.data))
        .catch(error => displayError('something went wrong try again later'))
}

const displaySong = songs => {
    const lyricsDiv = document.getElementById('lyricsDiv');
    displayNone('lyricsDiv');
    songs.forEach(song => {
        const lyricsRow = document.createElement('div');
        lyricsRow.className = "row single-result align-items-center my-3 p-3 ";
        lyricsRow.innerHTML = `
        <div class="col-md-9 ">
         <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
        </div>
    <div class="col-md-3 text-md-right text-center">
        <button class="btn btn-success" onclick="getLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
    </div> `
        lyricsDiv.appendChild(lyricsRow);
    })
}

const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data, `${artist}`, `${title}`))
}
const displayLyrics = (data, artist, title) => {
    const getTitle = document.getElementById('titleInfo');
    getTitle.innerHTML = `<h1 class="text-center">${title}</h1> <h3 class="text-center">${artist}</h3>`
    const getLyrics = document.getElementById('getLyrics');
    getLyrics.innerText = `${data.lyrics}`;
}
const displayNone = id => {
    document.getElementById(id).innerHTML = "";
}

const displayError = err => {
    document.getElementById('error-message').innerText = `${er}`;
}