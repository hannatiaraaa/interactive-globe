import createGlobe, { Marker } from 'cobe';
import type { SpringValue } from 'react-spring';

// size of marker => assume it's all same size
const size = 0.03;

// List of Countries with Latitude and Longitude
// https://www.distancelatlong.com/all/countries/
const markers: Marker[] = [
  { location: [-51.65003986, -72.30001612], size }, // Argentina
  { location: [-5.809995505, -46.14998438], size }, // Brazil
  { location: [39.83003522, 97.72999304], size }, //  China
  { location: [5.346999095, -72.4059986], size }, //  Colombia
  { location: [21.83999636, -78.76194727], size }, //  Cuba
  { location: [50.66299816, 14.08100455], size }, //  Czech Republic
  { location: [30.59199913, 30.89999749], size }, //  Egypt
  { location: [47.09099714, 17.91099957], size }, //  Hungary
  { location: [15.491997, 73.81800065], size }, //  India
  { location: [3.620359109, 98.50007524], size }, //  Indonesia
  { location: [49.62600011, 63.49899651], size }, //  Kazakhstan
  { location: [4.16670819, 73.49994747], size }, //  Maldives
  { location: [50.24999712, 106.2000006], size }, //  Mongolia
  { location: [35.02038047, -5.909985801], size }, //  Morocco
  { location: [-21.43600193, 15.95099754], size }, //  Namibia
  { location: [28.35000004, 82.18330255], size }, //  Nepal
  { location: [33.89918276, 70.10082678], size }, //  Pakistan
  { location: [31.90294475, 35.20620938], size }, //  Palestine
  { location: [53.80003522, 20.48003129], size }, //  Poland
  { location: [25.28655601, 51.53296789], size }, //  Qatar
  { location: [45.04500004, 23.27400062], size }, //  Romania
  { location: [43.23300312, 44.78300151], size }, //  Russia
  { location: [31.33330205, 37.33329653], size }, //  Saudi Arabia
  { location: [46.07001609, 19.68002844], size }, //  Serbia
  { location: [48.73329022, 19.14998328], size }, //  Slovakia
  { location: [-30.11726692, 28.70199951], size }, //  South Africa
  { location: [60.61300204, 15.64700455], size }, // Sweden
  { location: [33.399999, 10.41669956], size }, // Tunisia
  { location: [41.74299917, 27.22599962], size }, // Turkey
  { location: [46.96773907, 31.984342], size }, // Ukraine
  { location: [25.56527285, 55.55334265], size }, // United Arab Emirates
  { location: [-34.47999901, -57.84000247], size }, // Uruguay
  { location: [42.4047101, 59.45165767], size }, // Uzbekistan
  { location: [9.657999007, -68.58999854], size }, // Venezuela
  { location: [13.9789981, 45.57400265], size }, // Yemen
  { location: [-17.51961668, 30.97003699], size }, // Zimbabwe
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
    scale: 1.25,
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
