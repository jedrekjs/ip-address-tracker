// https://geo.ipify.org/api/v2/country,city?apiKey=at_fcRsd2QHaZcKH5dWydVn59GzSC8jm&ipAddress=8.8.8.8

const ipInput = document.getElementById("ipInput");
const resultIp = document.getElementById("result-ip");
const resultLocation = document.getElementById("result-location");
const resultPrefix = document.getElementById("timezone-prefix");
const resultTimezone = document.getElementById("result-timezone");
const resultIsp = document.getElementById("result-isp");

const markerIcon = L.icon({
    iconUrl: "./images/icon-location.svg", className: "",
    iconSize: [40, 50],
});

var marker;

var map = L.map('map',
    {
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        tap: true
    }).setView([0, 0], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getAddress(ipAddress) {
    return await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_fcRsd2QHaZcKH5dWydVn59GzSC8jm&ipAddress=" + ipAddress)
        .then((res) => res.json())
}

function setData(data) {
    resultIp.innerHTML = data.ip;
    resultLocation.innerHTML = data.location.city + ", " + data.location.country + ", " + data.location.geonameId;
    resultTimezone.innerHTML = data.location.timezone;
    resultIsp.innerHTML = data.isp;
}

function setMap(data) {
    map.setView([data.location.lat, data.location.lng], 14);
    if(marker != undefined) map.removeLayer(marker);
    marker = L.marker([data.location.lat, data.location.lng], { icon: markerIcon }).addTo(map);
}

async function searchIp(event) {
    event.preventDefault();
    const data = await getAddress(ipInput.value);
    setData(data)
    setMap(data)
}