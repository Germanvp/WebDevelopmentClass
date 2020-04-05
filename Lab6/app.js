const base_url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10"
var API_KEY = "AIzaSyB8eXaYUCHSV259ixBNTk4twAPF1XFpjNI"

var nextPageToken;
var prevPageToken;

var prevInput;

// Event Listeners
document.getElementById("searchForm").addEventListener('submit', function(event) {
    event.preventDefault();
    nextPageToken = null;
    prevPageToken = null;
    startSearch();
})

document.getElementById("nextPage").addEventListener('click', function(event) {
    event.preventDefault();
    if (nextPageToken) {
        continueSearch();
    }
})

document.getElementById("prevPage").addEventListener('click', function(event) {
    event.preventDefault();
    if (prevPageToken) {
        previousSearch();
    }
})

// Prepare URL functions

function startSearch() {
    document.querySelector("ul").innerHTML = ""
    let inputText = document.querySelector("input").value;
    prevInput = inputText;

    let url = base_url + `&q=${inputText}&key=${API_KEY}`

    let settings = {
        method: 'GET'
    }

    searchYoutube(url, settings)
}

function continueSearch() {
    document.querySelector("ul").innerHTML = ""

    let url = base_url + `&q=${prevInput}&pageToken=${nextPageToken}&key=${API_KEY}`

    let settings = {
        method: 'GET'
    }

    searchYoutube(url, settings)
}

function previousSearch() {
    document.querySelector("ul").innerHTML = ""

    let url = base_url + `&q=${prevInput}&pageToken=${prevPageToken}&key=${API_KEY}`

    let settings = {
        method: 'GET'
    }

    searchYoutube(url, settings)
}
// Search Function
function searchYoutube(url, settings) {

    console.log(url);

    fetch(url, settings) 
        .then (response => {
            if (response.ok) {
                return response.json ();
            }
        })
        .then (responseJSON => {
            nextPageToken = responseJSON["nextPageToken"]
            prevPageToken = responseJSON["prevPageToken"]

            for(var i = 0; i < 10; i++) {
                let item = responseJSON['items'][i];

                let title = item['snippet']['title'];
                let thumbnail = item['snippet']['thumbnails']['default']['url']
                let href = item['id']['videoId']

                document.querySelector("ul").innerHTML += `<li>
                                            <h5>
                                                <a href="https://www.youtube.com/watch?v=${href}" target="_blank"> ${title} </a>
                                            </h5> 
                                            <a href="https://www.youtube.com/watch?v=${href}" target="_blank">
                                                <img src = "${thumbnail}"/>
                                            </a>
                                            </li>`

            }
            console.log (responseJSON);
        })
        .catch (err => {
            console.log(err.message);
        })
    
}