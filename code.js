/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/

// Define a JSON object for storing the data model.
var m = {};

// night-time imagery
m.imgCol = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
m.dataBand = "avg_rad";
m.cloudBand = "cf_cvg";

// territory of interest
m.fCol = ee.FeatureCollection("users/VicenzaInnovationLab/istat21-province-g")
           .filter(ee.Filter.eq("COD_REG", 5));  // Veneto Region provinces
m.fColField = "DEN_UTS";
m.fColValue = "Vicenza";

// time interval
m.dateFormat = "YYYY-MM-dd";
m.date = {
  start: ee.Image(m.imgCol.first()).date().format(m.dateFormat).getInfo(),
  end: ee.Date(Date.now()).format(m.dateFormat).getInfo(),
};

// other
m.cloudThreshold = 1;
m.bufRadius = 50;  // in a clicked point, in meters

/*******************************************************************************
 * Translation *
 *
 * A section to define the text strings for different languages.
 * 
 * Guidelines: Use this section to provide support for a multilingual app:
 * t.draft = {
 *   it: "",
 *   en: "",
 *   ru: "",
 * };
 ******************************************************************************/

var ln = "ru";  // app language: "it", "en" or "ru"
var t = {};

t.mainTitle = {
  it: "Esploratore dell'inquinamento luminoso",
  en: "Light Pollution Explorer",
  ru: "Карта светового загрязнения",
};

t.startMsg = {
  it: "Seleziona una provincia e un periodo per osservare l'intensità delle \
  luci notturne. Per vedere una dinamica in un punto specifico clicca sulla \
  mappa e aspetta un po' - i calcoli che creano il grafico vengono eseguiti \
  nel tempo reale.",
  en: "Select the province and time period to observe the intensity of the \
  night lights. Click on the map to see a dynamic at a specific point and wait \
  a while - the calculations that create the chart are done in real time.",
  ru: "Выберите провинцию и период времени, чтобы увидеть интенсивность ночных \
  огней. Для изучения динамики в определенной точке надо кликнуть на карту и \
  немного подождать - вычисления, которые создают график, выполняются в режиме \
  реального времени.",
};

t.funding = {
  it: "Il progetto è parte del Programma Operativo Regionale del Fondo \
  Europeo di Sviluppo Regionale (POR FESR 2014-2020) del Veneto, \
  nell'ambito del bando dell'azione 231 volto alla “costituzione di \
  Innovation Lab diretti al consolidamento / sviluppo del network Centri \
  P3@-Palestre Digitali e alla diffusione della cultura degli Open Data”.",
  en: "The project is part of the Regional Operational Program of \
  the European Regional Development Fund (ROP ERDF 2014-2020) of \
  Veneto, in the context of the call for the action 231 \
  aimed at “Constitution of Innovation Labs directed to the \
  consolidation / development of the network of Centri P3@-Palestre \
  Digitali and the spread of the open data culture.”",
  ru: "Проект является частью региональной операционной программы \
  Европейского фонда регионального развития (ROP ERDF 2014-2020) \
  области Венето, в контексте консурса, проведённого в действии №231, \
  нацеленного на «создание инновационных лабораторий, направленных на \
  консолидацию / развитие сети Centri P3@-Palestre Digitali и \
  распространение культуры открытых данных».",
};

// chart
t.chartPlaceholder = {
  it: "👉 clicca sulla mappa per calcolare la serie temporale...",
  en: "👉 click on the map to calculate the time series...",
  ru: "👉 нажмите на карту, чтобы построить график...",
};

t.chart = {
  title: {
    it: "Dinamica nel punto interrogato",
    en: "Dynamics at the Clicked Point",
    ru: "Динамика в выбранной точке",
  },
  vAxis: {
    it: "Radianza, nW/(cm²·sr)",
    en: "Radiace, nW/(cm²·sr)",
    ru: "Энерг. яркость, нВт/(см²·ср)",
  },
  hAxis: {
    it: "Data",
    en: "Date",
    ru: "Дата",
  },
  trend: {
    it: "Trend",
    en: "Trend",
    ru: "Тренд",
  },
  series: {
    it: "Radianza",
    en: "Radiance",
    ru: "Энерг. яркость",
  },
};

t.chartNote = {
  title: {
    it: "Note sull'interpretazione del grafico",
    en: "Chart Interpretation Notes",
    ru: "Пояснения по интерпретации графика",
  },
  section: {
    1: {
      it: "Vicenza (VI): valore di ca. 50 nW/(cm²·sr)",
      en: "Vicenza (VI): valore di ca. 50 nW/(cm²·sr)",
      ru: "Виченца (пров. Виченца): значения ок. 50 нВт/(см²·ср)",
    },
    2: {
      it: "Malo (VI): valore di ca. 20 nW/(cm²·sr)",
      en: "Malo (VI): valore di ca. 20 nW/(cm²·sr)",
      ru: "Мало (пров. Виченца): значения ок. 20 нВт/(см²·ср)",
    },
    3: {
      it: "Sasso (VI): valore di ca. 5 nW/(cm²·sr)",
      en: "Sasso (VI): valore di ca. 5 nW/(cm²·sr)",
      ru: "Сассо (пров. Виченца): значения ок. 5 нВт/(см²·ср)",
    }
  },
  body: {
    1: {
      it: "Inquinamento luminoso molto alto. L'intero sfondo del cielo ha una \
      vaga tonalità bianca grigiastra. Forti sorgenti luminose sono evidenti \
      in tutte le direzioni. La Via Lattea è totalmente invisibile o quasi.",
      en: "The entire sky background has a vague, grayish white hue. Strong \
      light sources are evident in all directions. The Milky Way is totally \
      invisible or nearly so.",
      ru: "Весь фон неба имеет расплывчатый, серовато-белый оттенок. Сильные \
      источники света очевидны во всех направлениях. Млечный Путь полностью \
      невидим или почти таков.",
    },
    2: {
      it: "Inquinamento luminoso abbastanza alto. La Via Lattea è molto debole \
      o invisibile vicino all'orizzonte e sembra piuttosto sbiadita sopra \
      la testa. Le sorgenti luminose sono evidenti nella maggior parte se non \
      in tutte le direzioni.",
      en: "Fairly high light pollution. The Milky Way is very weak or \
      invisible near the horizon and looks rather washed out overhead. \
      Light sources are evident in most if not all directions.",
      ru: "Довольно высокое световое загрязнение. Млечный Путь очень тусклый \
      или невидим вблизи горизонта и выглядит довольно размытым над головой. \
      Источники света очевидны в большинстве, если не во всех направлениях.",
    },
    3: {
      it:  "Inquinamento luminoso moderato. Sono visibili solo strutture della \
      Via Lattea di grandi dimensioni. Tuttavia, un tale cielo è abbastanza \
      buono per gli standard di molte persone.",
      en: "Moderate light pollution. Only large structures of the Milky Way \
      are visible. Such a sky, fairly good by many people's standards.",
      ru: "Умеренное световое загрязнение. Видны только крупные структуры \
      Млечного Пути. Такое ночное небо будет удовлетворять ожиданиям \
      многих людей.",
    }
  }
};

// map
t.layers = {
  point: {
    it: "Punto interrogato",
    en: "Clicked Point",
    ru: "Выбранная точка",
  },
  vector: {
    it: "Limiti amministrativi",
    en: "Administrative Limits",
    ru: "Административные границы",
  },
  raster: {
    it: "Luci notturne (media)",
    en: "Averaged Night Lights",
    ru: "Усредн. ночная светимость",
  },
  map: {
    it: "Mappa scura",
    en: "Dark map",
    ru: "Тёмная карта",
  },
};

// interface elements
t.selector = {
  it: "Scegli una provincia",
  en: "Select a province",
  ru: "Выберите провинцию",
};

t.slider = {
  start: {
    it: "Inizio: ",
    en: "Start: ",
    ru: "Начало: ",
  },
  end: {
    it: "Fine: ",
    en: "End: ",
    ru: "Конец: ",
  },
};

// about button
t.about = {
  close: {
    it: "Chiudi",
    en: "Close",
    ru: "Закрыть",
  },
  open: {
    it: "Innovation Lab Vicenza",
    en: "About",
    ru: "О проекте",
  },
};

t.ref = {
  title: {
    it: "Più informazioni",
    en: "More info",
    ru: "Больше информации",
  },
  data: {
    it: "• Dati satellitari: VIIRS Stray Light Corrected Nighttime Day/Night Band Composites Version 1",
    en: "• Satellite Data: VIIRS Stray Light Corrected Nighttime Day/Night Band Composites Version 1",
    ru: "• Спутниковые данные: VIIRS Stray Light Corrected Nighttime Day/Night Band Composites Version 1",
  },
  docs: {
    it: "• Codice sorgente e documentazione: GitHub dell'Innovation Lab Vicenza",
    en: "• Source code and documentation: GitHub of the Innovation Lab Vicenza",
    ru: "• Исходный код и документация: страница Innovation Lab Vicenza на GitHub",
  },
};

/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/

// Define a JSON object for storing UI components.
var c = {};

c.mainTitle = ui.Label(t.mainTitle[ln]);
c.startMsg = ui.Label(t.startMsg[ln]);
c.chartNoteTitle = ui.Label(t.chartNote.title[ln]);
c.chartSection = {
  1: ui.Label(t.chartNote.section[1][ln]),
  2: ui.Label(t.chartNote.section[2][ln]),
  3: ui.Label(t.chartNote.section[3][ln]),
};
c.chartBody = {
  1: ui.Label(t.chartNote.body[1][ln]),
  2: ui.Label(t.chartNote.body[2][ln]),
  3: ui.Label(t.chartNote.body[3][ln]),
};
c.funding = ui.Label(t.funding[ln]);

/* Example
c.legend = {
  title: ui.Label();
}
*/


/*******************************************************************************
 * Composition *
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/

/* Example
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
*/


/*******************************************************************************
 * Styling *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/

// Define a JSON object for defining CSS-like class style properties.
var s = {};

s.brandColors = {
  grigio0: "#e4e4e4",  // backgrounds
  grigio1: "#a0a3a6",
  rosso0: "#f3a4a4",  // backgrounds
  rosso1: "#ea4f4d",
  rosso2: "#e52323",
  rosso3: "#b71c1a",  // titles
  blu: "#0d5a8c",  // subtitles
//bluEE: "#3079ed",  // GEE links
};
s.border = {color: s.brandColors.rosso1, width: 2, fillColor: "ff000000"};
s.viirs = {
  min: 0.0,
  max: 70.0,
  opacity: 0.6,
  palette: [
    "#000000", "#dd6e20", "#dd9740",
    "#e1b176", "#ecce96", "#ffffff"],
};

s.mainTitle = {
  fontSize: "26px",
  fontWeight: "bold",
  color: s.brandColors.rosso3
};
s.startMsg = {textAlign: "justify", stretch: "horizontal"};
s.chartNoteTitle = {fontWeight: "bold"};
s.chartPlaceholder = {color: s.brandColors.rosso2, fontSize: 14};
s.chart = {
  title: {
    color: s.brandColors.rosso2,
    fontSize: 14,
    bold: false,
    italic: false
  },
  axis: {
    color: s.brandColors.blu,
    fontSize: 12,
    bold: false,
    italic: false
  },
  default: {
    color: s.brandColors.blu,
    fontSize: 11,
    bold: false,
    italic: false
  }
};
s.aboutText = {textAlign: "left", stretch: "horizontal",};

s.darkMap = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#212121"
  }]
}, {
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#212121"
  }]
}, {
  "featureType": "administrative",
  "elementType": "geometry",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "administrative.country",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "administrative.locality",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#bdbdbd"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [{
    "color": "#181818"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#1b1b1b"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#2c2c2c"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#8a8a8a"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "geometry",
  "stylers": [{
    "color": "#373737"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#3c3c3c"
  }]
}, {
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry",
  "stylers": [{
    "color": "#4e4e4e"
  }]
}, {
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "featureType": "transit",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#3d3d3d"
  }]
}];

c.mainTitle.style().set(s.mainTitle);
c.startMsg.style().set(s.startMsg);
c.chartNoteTitle.style().set(s.startMsg);
c.funding.style().set(s.aboutText);

/*******************************************************************************
 * Behaviors *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/

 var applyFilters = function (target_collection) {
  return target_collection
    .filter(ee.Filter.bounds(aoi))
    .filter(ee.Filter.date(m.date.start, m.date.end));
};

var maskClouds = function (img) {
  var mask = img.select(m.cloudBand).gte(m.cloudThreshold);
  return img.updateMask(mask);
};

var makeComposite = function (target_collection) {
  return target_collection.select(m.dataBand).mean().clip(aoi);
};

// ### GRAPHICAL USER INTERFACE ###

var makePanelBreak = function () {
  return ui.Panel(
    {
      style: {
        stretch: "horizontal",
        height: "1px",
        backgroundColor: "grey",
        margin: "8px 0px"
      }
    });
};

var aoiNameHandler = function (selectedName) {
  m.fColValue = selectedName;
  print(m.fColValue);
  updateMap();
  Map.centerObject(aoi);
  chartPanel.widgets().set(0, chartPlaceHolder);
};

var startDateHandler = function (dateRange) {
  m.date.start = dateRange.start();
  updateMap();
};

var endDateHandler = function (dateRange) {
  m.date.end = dateRange.start();
  updateMap();
};

var cloudThreshHandler = function (value) {
  m.cloudThreshold = value;
  updateMap();
};

var updateMap = function () {
  aoi = m.fCol.filter(ee.Filter.eq(m.fColField, m.fColValue));
  filteredColl = applyFilters(m.imgCol);
  maskedColl = filteredColl.map(maskClouds);
  print("Immagini in collezione VIIRS:", maskedColl.size());
  composite = makeComposite(maskedColl);
  var compositeLayer = ui.Map.Layer(composite, s.viirs, t.layers.raster[ln]);
  var borderLayer = ui.Map.Layer(aoi.style(s.border), {}, t.layers.vector[ln]);
  Map.layers().set(0, compositeLayer);
  Map.layers().set(1, borderLayer);
};

var mapClickHandler = function (coords) {
  var clickedPoint = ee.Geometry.Point(coords.lon, coords.lat).buffer(m.bufRadius);
  var clickedPointLayer = ui.Map.Layer(clickedPoint, {color: "pink"}, t.layers.point[ln]);
  Map.layers().set(2, clickedPointLayer);

var chart = ui.Chart.image.series({
    imageCollection: maskedColl.select(m.dataBand),
    region: clickedPoint,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setSeriesNames([t.chart.series[ln]])
    .setOptions({
      title: t.chart.title[ln],
      titleTextStyle: s.chart.title,
      vAxis: {
        title: t.chart.vAxis[ln],
        textStyle: s.chart.default,
        titleTextStyle: s.chart.axis,
        gridlines: {color: "#3b3b3b"}},
      hAxis: {
        title: t.chart.hAxis[ln],
        textStyle: s.chart.default,
        titleTextStyle: s.chart.axis,
        gridlines: {color: "#3b3b3b"},
      },
      curveType: "function",
      colors: ["#eed3a2"],
      legend: {textStyle: s.chart.axis},
      chartArea: {backgroundColor: "#4e4e4e"},
      trendlines: {
        0: {  // add a trend line to the 1st series
          title: t.chart.trend[ln],
          type: "polynomial",  // "linear", "polynomial" or "exponential"
          color: s.brandColors.rosso2,
          lineWidth: 3,
          opacity: 0.9,
          visibleInLegend: true,
        }
      }
    });
  chartPanel.widgets().set(0, chart);
};


// #############################################################################
// ### IMPLEMENTATION ###
// #############################################################################

// globals
var aoi;
var filteredColl;
var maskedColl;
var composite;

var aois = m.fCol.aggregate_array(m.fColField).sort().getInfo();

// UI
var provinceSelector = ui.Select({
  items: aois,
  placeholder: "Seleziona un'area",
  value: m.fColValue,
  onChange: aoiNameHandler,
  // disabled,
  style: {stretch: "horizontal"}
});

var provinceLabel = ui.Label({
  value: t.selector[ln],
  style: {stretch: "vertical"}
});

var admPanel = ui.Panel({
  widgets: [provinceLabel, provinceSelector],
  layout: ui.Panel.Layout.flow('horizontal')
});

var startDateSelector = ui.DateSlider({
  start: m.date.start,
  // end,
  value: m.date.start,
  period: 1,
  onChange: startDateHandler,
  style: {width: "72%"}
});

var endDateSelector = ui.DateSlider({
  start: m.date.start,
  // end,
  value: m.date.end,
  period: 1,
  onChange: endDateHandler,
  style: {width: "72%"}
});

var startDateLabel = ui.Label({value: t.slider.start[ln], style: {stretch: "both"}});
var endDateLabel = ui.Label({value: t.slider.end[ln], style: {stretch: "both",}});

var startDatePanel = ui.Panel({
  widgets: [startDateLabel, startDateSelector],
  layout: ui.Panel.Layout.flow("horizontal")
});

var endDatePanel = ui.Panel({
  widgets: [endDateLabel, endDateSelector],
  layout: ui.Panel.Layout.flow("horizontal")
});

var datePanel = ui.Panel({
  widgets: [startDatePanel, endDatePanel],
});

var cloudSlider = ui.Slider({
  min: 0,
  max: 60,
  value: 1,
  step: 1,
  onChange: cloudThreshHandler,
  style: {stretch: "horizontal"}
});

// Image acquisitions without clouds
// var cloudPanel = ui.Panel({
//   widgets: [ui.Label("Acquisizioni senza nuvole / mesi"), cloudSlider],
//   layout: ui.Panel.Layout.flow("horizontal")
// });

var chartPlaceHolder = ui.Label({
  value: t.chartPlaceholder[ln],
  style: s.chartPlaceholder,
});
var chartPanel = ui.Panel();

var referencesLabel = ui.Label({
  value: t.ref.title[ln],
  style: {fontSize: "20px", fontWeight: "bold"}  //, textAlign : 'center', stretch: 'horizontal'},
});

var dataSource = ui.Label({
  value: t.ref.data[ln],
  targetUrl: "https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_DNB_MONTHLY_V1_VCMSLCFG"
});

var gitHub = ui.Label({
  value: t.ref.docs[ln],
  targetUrl: "https://github.com/VicenzaInnovationLab/ee-inquinamento-luminoso"
});

var mainPanel = ui.Panel({
  widgets: [
    c.mainTitle,
    c.startMsg,
    makePanelBreak(),
    admPanel,
    datePanel,
    makePanelBreak(),
    chartPanel,
    makePanelBreak(),
    c.chartNoteTitle,
    c.chartSection[1], c.chartBody[1],
    c.chartSection[2], c.chartBody[2],
    c.chartSection[3], c.chartBody[3],
  ],
  // layout,
  style: {width: "25%", border: "1px solid black", padding: "10px"}
});


// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: {
    min: 0,
    max: 1,
    palette: s.viirs.palette,
    bbox: [0, 0, 1, 0.1],
    dimensions: "100x10",
    format: "png",
  },
  style: {stretch: "horizontal", margin: "0px 8px", maxHeight: "20px"},
});

// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(s.viirs.min, {margin: "4px 8px", fontSize: "12px"}), //
    ui.Label((s.viirs.max / 2), {
      margin: "4px 8px",
      textAlign: "center",
      stretch: "horizontal",
      fontSize: "12px"
    }),
    ui.Label(s.viirs.max, {margin: "4px 8px", fontSize: "12px"})
  ],
  layout: ui.Panel.Layout.flow("horizontal")
});

var legendTitle = ui.Label({
  value: t.chart.vAxis[ln],
  style: {fontWeight: "bold", fontSize: "12px"}
});

var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels], null, {width: "25%"});

// Project info panel
var aboutInfoCloseButton = ui.Button({
  label: t.about.close[ln],
  onClick: function() {
    aboutInfoOpenButton.style().set("shown", true);
    aboutPanel.style().set("shown", false);
  },
  style: {position: "bottom-left", "shown": true}
});

var aboutInfoOpenButton = ui.Button({
  label: t.about.open[ln],
  onClick: function() {
    aboutInfoOpenButton.style().set("shown", false);
    aboutPanel.style().set("shown", true);
  },
  style: {position: "bottom-left", "shown": true}
});

// Create a panel, initially hidden
var projectLogo = ui.Thumbnail({
    image: ee.Image("users/VicenzaInnovationLab/logo-progetto"),
    params: {min: 0, max: 255},
    style: {width: "200px"}
});

var aboutPanel = ui.Panel({
  style: {
    width: "400px",
    shown: false
  },
  widgets: [
    projectLogo,
    c.funding,
    referencesLabel,
    dataSource,
    gitHub,
    aboutInfoCloseButton]
});

// Add the button to the map and the panel to root.
Map.add(aboutInfoOpenButton);
ui.root.insert(0, aboutPanel);

// #############################################################################
// ### VISUALIZATION ###
// #############################################################################

var basemapOptions = {
  mapTypeId: t.layers.map[ln],
  styles: {},
  types: [t.layers.map[ln]]
};
basemapOptions.styles[t.layers.map[ln]] = s.darkMap;
Map.setOptions(basemapOptions);

// ### USER INTERFACE ###

ui.root.insert(2, mainPanel);
Map.add(legendPanel);
Map.onClick(mapClickHandler);

chartPanel.widgets().set(0, chartPlaceHolder);
updateMap();
Map.centerObject(aoi);

/* Example
// Handles updating the legend when band selector changes.
function updateLegend() {
  c.legend.title.setValue(c.bandSelect.getValue() + ' (%)');
}
*/


/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/

/* Example
// Selected year.
m.year = 2020;
*/
