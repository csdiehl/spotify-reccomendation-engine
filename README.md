# Spotify Reccomendation Engine

This project uses data from the Spotify Web API to find songs that match user preferences and display these in an engaging and responsive dashboard using React.js. Users can sort the results based on musical qualities, and click a button to listen to the song in Spotify. 

Project Link (you need a Spotify account and may need to be added to the approved list of users in development mode to view):
https://csdiehl.github.io/spotify-reccomendation-engine/

https://user-images.githubusercontent.com/59377951/170523674-093a1692-3770-44bd-b5c8-34ff0826a481.mp4

## Authentication

Users authenticate using a simple implicit grant flow detailed in the Spotify Web API docs. After the user's account is verified, the app receives a token that is sent with future API requests to access protected resources. 

## Complex Search and Filtering Logic

The intuitive user interface allows users to dynamically search for and select up to 5 musical genres. They can then select target values for musical qualities such as danceability, loudness and acousticness. These are encoded as query parameters and sent to the Spotify reccomendations endpoint. 

## Returning and Displaying Results

The response is processed into a list of songs with graphs showing musical qualities and a button linking to play the song in Spotify. Users and sort the songs by musical qualities. 

