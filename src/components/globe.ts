import createGlobe, { Marker } from 'cobe';
import type { SpringValue } from 'react-spring';

// size of marker => assume it's all same size
const size = 0.03;

// List of Countries with Latitude and Longitude
// https://www.distancelatlong.com/all/countries/
const markers: Marker[] = [
  { location: [49.98247246, 8.273219156], size }, // Germany
  { location: [53.00000109, 6.550002585], size }, // Netherlands
  { location: [47.51669707, 9.766701588], size }, //  Austria
  { location: [50.44599911, 3.939003561], size }, //  Belgium
  { location: [55.70900103, 9.534996498], size }, //  Denmark
  { location: [60.61300204, 15.64700455], size }, //  Sweden
  { location: [58.46475606, 8.766000553], size }, //  Norway
  { location: [60.99699611, 24.47199954], size }, //  Findland
  { location: [55.93329002, -4.750030763], size }, //  UK
];

export const showGlobe = (canvas: HTMLCanvasElement, r: SpringValue<number>) => {
  let phi = 5;
  let width = 0;
  const onResize = () => canvas && (width = canvas.offsetWidth);
  window.addEventListener('resize', onResize);
  onResize();
  const globe = createGlobe(canvas, {
    devicePixelRatio: 2,
    width: width,
    height: width,
    phi: 0,
    theta: 0.5,
    dark: 0,
    diffuse: 1.2,
    scale: 1.5,
    mapSamples: 16000,
    mapBrightness: 10,
    baseColor: [1, 1, 1],
    markerColor: [1, 0.5, 1],
    glowColor: [1, 1, 1],
    offset: [0, 0],
    markers,
    onRender: (state) => {
      console.log(r.get(), phi);
      state.phi = phi + r.get();
      phi += 0.003;
      state.width = width * 2;
      state.height = width;
    },
  });

  return globe;
};
