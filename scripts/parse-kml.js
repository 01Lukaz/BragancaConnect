const fs = require('fs');
const path = require('path');

const kmlPath = path.join(__dirname, '..', 'Untitled map.kml');
const xml = fs.readFileSync(kmlPath, 'utf8');

// Very small KML parser using regex to extract <Placemark> blocks
const placemarkRegex = /<Placemark[\s\S]*?<\/Placemark>/g;
const nameRegex = /<name>([\s\S]*?)<\/name>/i;
const coordRegex = /<coordinates>([\s\S]*?)<\/coordinates>/i;
const lineStringRegex = /<LineString[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>[\s\S]*?<\/LineString>/i;

const blocks = xml.match(placemarkRegex) || [];

const out = [];
for (const b of blocks) {
  const nameM = b.match(nameRegex);
  const name = nameM ? nameM[1].trim() : '';
  if (!name || name.toLowerCase() === 'untitled placemark') continue;

  // prefer Point coordinate, otherwise take first coordinate from LineString
  let coords = null;
  const pointCoords = b.match(coordRegex);
  if (pointCoords) {
    coords = pointCoords[1].trim();
  } else {
    const ls = b.match(lineStringRegex);
    if (ls) coords = ls[1].trim();
  }
  if (!coords) continue;

  // coordinates may be one or many; use first coordinate set
  const first = coords.split(/\s+/)[0].trim();
  // KML coords are lon,lat,alt
  const parts = first.split(',');
  const lon = parseFloat(parts[0]);
  const lat = parseFloat(parts[1]);
  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    out.push({ nome: name, lat, lng: lon });
  }
}

console.log(JSON.stringify(out, null, 2));
