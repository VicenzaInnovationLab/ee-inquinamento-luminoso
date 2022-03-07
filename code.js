/*******************************************************************************
 * Code style *
 * 
 *  - use camelCase for function and variable names
 *  - use double quotes by default
 *  - use double space after your code and before // in inline comments
 ******************************************************************************/

/*******************************************************************************
 * Model *
 ******************************************************************************/

// Define a JSON object for storing the data model
var m = {};

/* Night-time Imagery *********************************************************/
m.viirs = {};
m.viirs.source = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
m.viirs.bands = {data: "avg_rad", cloud: "cf_cvg"};
m.viirs.cloudThreshold = 1;
m.viirs.vis = {
  min: 0.0,
  max: 50.0,
  opacity: 0.6,
  palette: [
    "#000000", "#dd6e20", "#dd9740",
    "#e1b176", "#ecce96", "#ffffff"
  ]
};

/* Territory of Interest ******************************************************/
m.provinces = {};
m.provinces.source = ee.FeatureCollection(
  "users/VicenzaInnovationLab/istat21-province-g")
  .filter(ee.Filter.eq("COD_REG", 5));  // Veneto Region provinces
m.provinces.filtFieldName = "DEN_UTS";
m.provinces.filtFieldVal = "Vicenza";
m.provinces.list = m.provinces.source.aggregate_array(m.provinces.filtFieldName)
                   .sort().getInfo();
m.provinces.vis = {color: "#ea4f4d", width: 2, fillColor: "ff000000"};
m.provinces.zoom = 10;

/* Time Interval **************************************************************/
m.date = {};
m.date.format = "YYYY-MM-dd";
m.date.start = ee.Image(m.viirs.source.first())
               .date().format(m.date.format).getInfo();  // from dataset
m.date.end = ee.Date(Date.now()).format(m.date.format).getInfo();  // today

/* Other **********************************************************************/
m.bufRadius = 50;  // in a clicked point, in meters

/*******************************************************************************
 * Translation *
 ******************************************************************************/

// Choose app language: "it", "en" or "ru"
var ln = "it";  

// Define a JSON object for storing translated text
var t = {};

t.title = {
  it: "Esploratore dell'inquinamento luminoso",
  en: "Light Pollution Explorer",
  ru: "Карта светового загрязнения",
};

t.intro = {
  it: "Seleziona una provincia per osservare l'intensità delle \
  luci notturne dal 2014. Per vedere una dinamica in un punto specifico clicca sulla \
  mappa e aspetta un po' - i calcoli che creano il grafico vengono eseguiti \
  nel tempo reale.",
  en: "Select the provinceto observe the intensity of the night lights from 2014. \
  Click on the map to see a dynamic at a specific point and wait \
  a while - the calculations that create the chart are done in real time.",
  ru: "Выберите провинцию, чтобы увидеть интенсивность ночных огней \
  c 2014 года. Для изучения динамики в определенной точке надо кликнуть на карту и \
  немного подождать - вычисления, которые создают график, выполняются в режиме \
  реального времени.",
};

/* Chart **********************************************************************/

t.chart = {};
t.chart.placeholder = {
  it: "👉 clicca sulla mappa per calcolare la serie temporale...",
  en: "👉 click on the map to calculate the time series...",
  ru: "👉 нажмите на карту, чтобы построить график...",
};
t.chart.title = {
  it: "Dinamica nel punto interrogato",
  en: "Dynamics at the Clicked Point",
  ru: "Динамика в выбранной точке",
};
t.chart.vAxis = {
  it: "Radianza, nW/(cm²·sr)",
  en: "Radiace, nW/(cm²·sr)",
  ru: "Энерг. яркость, нВт/(см²·ср)",
};
t.chart.hAxis = {it: "Data", en: "Date", ru: "Дата"};
t.chart.trend = {it: "Trend", en: "Trend", ru: "Тренд"},
t.chart.series = {it: "Radianza", en: "Radiance", ru: "Энерг. яркость"};

/* Chart Notes ****************************************************************/

t.chartNote = {};
t.chartNote.title = {
  it: "Note sull'interpretazione del grafico",
  en: "Chart Interpretation Notes",
  ru: "Пояснения по интерпретации графика"
};
t.chartNote.section = {};
t.chartNote.section[1] = {
  it: "Vicenza (VI): valore di ca. 50 nW/(cm²·sr)",
  en: "Vicenza (VI): valore di ca. 50 nW/(cm²·sr)",
  ru: "Виченца (пров. Виченца): значения ок. 50 нВт/(см²·ср)"
};
t.chartNote.section[2] = {
  it: "Malo (VI): valore di ca. 20 nW/(cm²·sr)",
  en: "Malo (VI): valore di ca. 20 nW/(cm²·sr)",
  ru: "Мало (пров. Виченца): значения ок. 20 нВт/(см²·ср)"
};
t.chartNote.section[3] = {
  it: "Sasso (VI): valore di ca. 5 nW/(cm²·sr)",
  en: "Sasso (VI): valore di ca. 5 nW/(cm²·sr)",
  ru: "Сассо (пров. Виченца): значения ок. 5 нВт/(см²·ср)"
};
t.chartNote.body = {};
t.chartNote.body[1] = {
  it: "Inquinamento luminoso molto alto. L'intero sfondo del cielo ha una \
  vaga tonalità bianca grigiastra. Forti sorgenti luminose sono evidenti \
  in tutte le direzioni. La Via Lattea è totalmente invisibile o quasi.",
  en: "The entire sky background has a vague, grayish white hue. Strong \
  light sources are evident in all directions. The Milky Way is totally \
  invisible or nearly so.",
  ru: "Весь фон неба имеет расплывчатый, серовато-белый оттенок. Сильные \
  источники света очевидны во всех направлениях. Млечный Путь полностью \
  невидим или почти таков."
};
t.chartNote.body[2] = {
  it: "Inquinamento luminoso abbastanza alto. La Via Lattea è molto debole \
  o invisibile vicino all'orizzonte e sembra piuttosto sbiadita sopra \
  la testa. Le sorgenti luminose sono evidenti nella maggior parte se non \
  in tutte le direzioni.",
  en: "Fairly high light pollution. The Milky Way is very weak or \
  invisible near the horizon and looks rather washed out overhead. \
  Light sources are evident in most if not all directions.",
  ru: "Довольно высокое световое загрязнение. Млечный Путь очень тусклый \
  или невидим вблизи горизонта и выглядит довольно размытым над головой. \
  Источники света очевидны в большинстве, если не во всех направлениях."
};
t.chartNote.body[3] = {
  it:  "Inquinamento luminoso moderato. Sono visibili solo strutture della \
  Via Lattea di grandi dimensioni. Tuttavia, questo tipo di cielo è abbastanza \
  buono per gli standard di molte persone.",
  en: "Moderate light pollution. Only large structures of the Milky Way \
  are visible. Such a sky, fairly good by many people's standards.",
  ru: "Умеренное световое загрязнение. Видны только крупные структуры \
  Млечного Пути. Такое ночное небо будет удовлетворять ожиданиям \
  многих людей."
};

/* Map Layers *****************************************************************/

t.layers = {};
t.layers.point = {
  it: "Punto interrogato",
  en: "Clicked Point",
  ru: "Выбранная точка",
};
t.layers.vector = {
  it: "Limiti amministrativi",
  en: "Administrative Limits",
  ru: "Административные границы",
};
t.layers.raster = {
  it: "Luci notturne (media)",
  en: "Averaged Night Lights",
  ru: "Усредн. ночная светимость",
};
t.layers.basemap = {it: "Mappa scura", en: "Dark map", ru: "Тёмная карта"};

/* Interface Elements *********************************************************/

t.provinceSelectorLabel = {
  it: "Scegli una provincia",
  en: "Select a province",
  ru: "Выберите провинцию",
};

t.timeline = {};
t.timeline.start = {it: "Inizio: ", en: "Start: ", ru: "Начало: "};
t.timeline.end = {it: "Fine: ", en: "End: ", ru: "Конец: "};

/* About **********************************************************************/

t.about = {};
t.about.funding = {
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
t.about.closeButton = {it: "Chiudi", en: "Close", ru: "Закрыть"};
t.about.openButton = {
  it: "Innovation Lab Vicenza",
  en: "About",
  ru: "О проекте"
};
t.about.title = {
  it: "Più informazioni",
  en: "More info",
  ru: "Больше информации",
};
t.about.data = {
  it: "• Dati satellitari: VIIRS Stray Light Corrected Nighttime Day/Night \
  Band Composites Version 1",
  en: "• Satellite Data: VIIRS Stray Light Corrected Nighttime Day/Night Band \
  Composites Version 1",
  ru: "• Спутниковые данные: VIIRS Stray Light Corrected Nighttime Day/Night \
  Band Composites Version 1"
};
t.about.refs = {
  it: "• Codice sorgente e documentazione: GitHub dell'Innovation Lab Vicenza",
  en: "• Source code and documentation: GitHub of the Innovation Lab Vicenza",
  ru: "• Исходный код и документация: страница Innovation Lab Vicenza на GitHub"
};

/* Console Printing ***********************************************************/

t.console = {};
t.console.totalImages = {
  "it": "Immagini in collezione VIIRS:",
  "en": "Images in the VIIRS collection:",
  "ru": "Изображений в коллекции VIIRS:",
};

/*******************************************************************************
 * Components *
 ******************************************************************************/

// Define a JSON object for storing UI components
var c = {};

c.title = ui.Label(t.title[ln]);
c.intro = ui.Label(t.intro[ln]);

/* Province Selector **********************************************************/

c.selectProvince = {};
c.selectProvince.label = ui.Label(t.provinceSelectorLabel[ln]);
c.selectProvince.selector = ui.Select({
  items:  m.provinces.list,
  placeholder: t.chart.placeholder[ln],
  onChange: aoiNameHandler
});

c.selectProvince.panel = ui.Panel({
  widgets: [c.selectProvince.label, c.selectProvince.selector],
  layout: ui.Panel.Layout.flow("horizontal")
});

/* Timeline *******************************************************************/

c.timeline = {};

// Start
c.timeline.start = {};
c.timeline.start.label = ui.Label(t.timeline.start[ln]);

c.timeline.start.selector = ui.DateSlider({
  start: m.date.start,
  period: 1,
  onChange: startDateHandler
});
c.timeline.start.panel = ui.Panel({
  widgets: [c.timeline.start.label, c.timeline.start.selector],
  layout: ui.Panel.Layout.flow("horizontal")
});

// End
c.timeline.end = {};
c.timeline.end.label = ui.Label(t.timeline.end[ln]);
c.timeline.end.selector = ui.DateSlider({
  start: m.date.start,
  period: 1,
  onChange: endDateHandler
});
c.timeline.end.panel = ui.Panel({
  widgets: [c.timeline.end.label, c.timeline.end.selector],
  layout: ui.Panel.Layout.flow("horizontal")
});

c.timeline.panel = ui.Panel({
  widgets: [c.timeline.start.panel, c.timeline.end.panel],
});

/* Chart **********************************************************************/

c.chart = {};
c.chart.placeholder = ui.Label(t.chart.placeholder[ln]);
c.chart.panel = ui.Panel();

/* Chart Notes ****************************************************************/

c.chartNote = {};
c.chartNote.title = ui.Label(t.chartNote.title[ln]);

c.chartNote.section = {};
c.chartNote.section[1] = ui.Label(t.chartNote.section[1][ln]);
c.chartNote.section[2] = ui.Label(t.chartNote.section[2][ln]);
c.chartNote.section[3] = ui.Label(t.chartNote.section[3][ln]);

c.chartNote.body = {};
c.chartNote.body[1] = ui.Label(t.chartNote.body[1][ln]);
c.chartNote.body[2] = ui.Label(t.chartNote.body[2][ln]);
c.chartNote.body[3] = ui.Label(t.chartNote.body[3][ln]);

/* Legend *********************************************************************/

c.legend = {};
c.legend.title = ui.Label(t.chart.vAxis[ln]);
c.legend.bar = {};
c.legend.bar.colors = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: {
    min: 0,
    max: 1,
    palette: m.viirs.vis.palette,
    bbox: [0, 0, 1, 0.1],
    dimensions: "100x10",
    format: "png",
  }
});

c.legend.bar.min = ui.Label(m.viirs.vis.min);
c.legend.bar.mid = ui.Label(m.viirs.vis.max / 2),
c.legend.bar.max = ui.Label(m.viirs.vis.max);

c.legend.bar.labels = ui.Panel({
  widgets: [c.legend.bar.min, c.legend.bar.mid, c.legend.bar.max],
  layout: ui.Panel.Layout.flow("horizontal")
});

c.legend.panel = ui.Panel(
  [c.legend.title, c.legend.bar.colors, c.legend.bar.labels], null, {}
);

/* About Panel ****************************************************************/

c.about = {};

c.about.title = ui.Label(t.about.title[ln]);
c.about.logo = ui.Thumbnail({
  image: ee.Image("users/VicenzaInnovationLab/logo-progetto"),
  params: {min: 0, max: 255}
});
c.about.funding = ui.Label(t.about.funding[ln]);

c.about.dataSource = ui.Label({
  value: t.about.data[ln],
  targetUrl: "https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_DNB_MONTHLY_V1_VCMSLCFG"
});
c.about.gitHub = ui.Label({
  value: t.about.refs[ln],
  targetUrl: "https://github.com/VicenzaInnovationLab/ee-inquinamento-luminoso"
});

c.about.closeButton = ui.Button({
  label: t.about.closeButton[ln],
  onClick: function() {
    c.about.openButton.style().set("shown", true);
    c.about.panel.style().set("shown", false);
  }
});
c.about.openButton = ui.Button({
  label: t.about.openButton[ln],
  onClick: function() {
    c.about.openButton.style().set("shown", false);
    c.about.panel.style().set("shown", true);
  }
});

c.about.panel = ui.Panel([
  c.about.logo,
  c.about.funding,
  c.about.title,
  c.about.dataSource,
  c.about.gitHub,
  c.about.closeButton]
);

/* Control Panel  *************************************************************/

c.controlPanel = ui.Panel([
  c.title,
  c.intro,
  makePanelBreak(),
  c.selectProvince.panel,
  // c.timeline.panel,
  makePanelBreak(),
  c.chart.panel,
  makePanelBreak(),
  c.chartNote.title,
  c.chartNote.section[1], c.chartNote.body[1],
  c.chartNote.section[2], c.chartNote.body[2],
  c.chartNote.section[3], c.chartNote.body[3],
]);

/* Custom Base Map ************************************************************/
c.basemap = {
  mapTypeId: t.layers.basemap[ln],
  styles: {},
  types: [t.layers.basemap[ln]]
};

/*******************************************************************************
 * Composition *
 ******************************************************************************/

ui.root.insert(0, c.about.panel);
ui.root.insert(2, c.controlPanel);

Map.add(c.about.openButton);
Map.add(c.legend.panel);

Map.onClick(mapClickHandler);

/*******************************************************************************
 * Styling *
 ******************************************************************************/

// Define a JSON object for defining CSS-like class style properties
var s = {};

/* Style Definitions **********************************************************/

// Color palettes
s.colors = {};
s.colors.brand = {
  grigio0: "#e4e4e4",  // backgrounds
  grigio1: "#a0a3a6",
  rosso0: "#f3a4a4",  // backgrounds
  rosso1: "#ea4f4d",
  rosso2: "#e52323",
  rosso3: "#b71c1a",  // titles
  blu: "#0d5a8c"  // subtitles
};
s.colors.chart = {
  mainCurve: "#eed3a2",
  trend: "#e52323",
  areaBackground: "#4e4e4e",
  gridline: "#3b3b3b"
};

// Main text styles
s.text = {};
s.text.title = {
  fontSize: "26px",
  fontWeight: "bold",
  color: s.colors.brand.rosso3
};
s.text.justified = {textAlign: "justify", stretch: "horizontal"};
s.text.leftAligned = {textAlign: "left", stretch: "horizontal"};
s.text.chartNote = {};
s.text.chartNote.title = {fontWeight: "bold", fontSize: "16px"};
s.text.chartNote.section = {fontWeight: "bold"};

// Timeline
s.timeline = {};
s.timeline.selector = {width: "72%"};
s.timeline.label = {stretch: "both"};

// Chart
s.chart = {};
s.chart.placeholder = {color: s.colors.brand.blu, fontSize: 14};
s.chart.title = {
  color: s.colors.brand.blu,
  fontSize: 16,
  bold: true,
  italic: false
};
s.chart.axis = {
  color: s.colors.brand.blu,
  fontSize: 12,
  bold: false,
  italic: false
};
s.chart.default = {
  color: s.colors.brand.blu,
  fontSize: 11,
  bold: false,
  italic: false
};

s.chart.options = {};
s.chart.options.title = t.chart.title[ln];
s.chart.options.titleTextStyle = s.chart.title;
s.chart.options.vAxis = {
  title: t.chart.vAxis[ln],
  textStyle: s.chart.default,
  titleTextStyle: s.chart.axis,
  gridlines: { color: s.colors.chart.gridline }
};
s.chart.options.hAxis = {
  title: t.chart.hAxis[ln],
  textStyle: s.chart.default,
  titleTextStyle: s.chart.axis,
  gridlines: { color: s.colors.chart.gridline },
};
s.chart.options.curveType = "function";
s.chart.options.colors = [s.colors.chart.mainCurve];
s.chart.options.legend = {textStyle: s.chart.axis};
s.chart.options.chartArea = {backgroundColor: s.colors.chart.areaBackground};
s.chart.options.trendlines = {};
s.chart.options.trendlines[0] = {
  title: t.chart.trend[ln],
  type: "polynomial",
  color: s.colors.chart.trend,
  lineWidth: 3,
  opacity: 0.9,
  visibleInLegend: true
};

// Legend panel
s.legend = {};
s.legend.title = {fontWeight: "bold", fontSize: "12px"};
s.legend.minMax = {margin: "4px 8px", fontSize: "12px"};
s.legend.mid = {
  margin: "4px 8px",
  textAlign: "center",
  stretch: "horizontal",
  fontSize: "12px"
};

// About panel
s.aboutButton = {position: "bottom-left", "shown": true};

// Base map
s.darkBasemap = [{
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

/* Style Settings *************************************************************/

c.controlPanel.style().set({
  width: "50%",
  border: "1px solid black",
  padding: "10px"
});
c.title.style().set(s.text.title);
c.intro.style().set(s.text.justified);

// Province selector
c.selectProvince.label.style().set({stretch: "vertical"});
c.selectProvince.selector.style().set({stretch: "horizontal"});

// Timeline
c.timeline.start.label.style().set(s.timeline.label);
c.timeline.end.label.style().set(s.timeline.label);
c.timeline.start.selector.style().set(s.timeline.selector);
c.timeline.end.selector.style().set(s.timeline.selector);

// Chart
c.chart.placeholder.style().set(s.chart.placeholder);

// Chart notes
c.chartNote.title.style().set(s.text.chartNote.title);

c.chartNote.section[1].style().set(s.text.chartNote.section);
c.chartNote.section[2].style().set(s.text.chartNote.section);
c.chartNote.section[3].style().set(s.text.chartNote.section);

// About
c.about.panel.style().set({width: "400px", shown: false});
c.about.openButton.style().set(s.aboutButton);
c.about.closeButton.style().set(s.aboutButton);

c.about.title.style().set({fontSize: "20px", fontWeight: "bold"});
c.about.logo.style().set({width: "200px"});
c.about.funding.style().set(s.text.leftAligned);

// Legend
c.legend.panel.style().set({width: "25%"});
c.legend.bar.colors.style().set({
  stretch: "horizontal",
  margin: "0px 8px",
  maxHeight: "20px"
});
c.legend.title.style().set(s.legend.title);
c.legend.bar.min.style().set(s.legend.minMax);
c.legend.bar.max.style().set(s.legend.minMax);
c.legend.bar.mid.style().set(s.legend.mid);

// Basemap
c.basemap.styles[t.layers.basemap[ln]] = s.darkBasemap;

/*******************************************************************************
 * Behaviors *
 ******************************************************************************/

var aoi, filteredColl, maskedColl, composite;

function applyFilters(target_collection) {
  return target_collection
    .filter(ee.Filter.bounds(aoi))
    .filter(ee.Filter.date(m.date.start, m.date.end));
}

function maskClouds(img) {
  var mask = img.select(m.viirs.bands.cloud).gte(m.viirs.cloudThreshold);
  return img.updateMask(mask);
}

function makeComposite(target_collection) {
  return target_collection.select(m.viirs.bands.data).mean().clip(aoi);
}

function makePanelBreak() {
  return ui.Panel(
    {
      style: {
        stretch: "horizontal",
        height: "1px",
        backgroundColor: "grey",
        margin: "8px 0px"
      }
    });
}

function aoiNameHandler(selectedName) {
  m.provinces.filtFieldVal = selectedName;
  updateMap();
  Map.centerObject(aoi, m.provinces.zoom);
  c.chart.panel.widgets().set(0, c.chart.placeholder);
}

function startDateHandler(dateRange) {
  m.date.start = dateRange.start();
  updateMap();
}

function endDateHandler(dateRange) {
  m.date.end = dateRange.start();
  updateMap();
}

function cloudThreshHandler(value) {
  m.viirs.cloudThreshold = value;
  updateMap();
}

function updateMap() {
  aoi = m.provinces.source.filter(ee.Filter.eq(m.provinces.filtFieldName, m.provinces.filtFieldVal));
  filteredColl = applyFilters(m.viirs.source);
  maskedColl = filteredColl.map(maskClouds);
  composite = makeComposite(maskedColl);
  var compositeLayer = ui.Map.Layer(composite, m.viirs.vis, t.layers.raster[ln]);
  var borderLayer = ui.Map.Layer(aoi.style(m.provinces.vis), {}, t.layers.vector[ln]);
  Map.layers().set(0, compositeLayer);
  Map.layers().set(1, borderLayer);
}

function mapClickHandler(coords) {
  var clickedPoint = ee.FeatureCollection(ee.Feature(ee.Geometry.Point(coords.lon, coords.lat)));
  var clickedPointLayer = ui.Map.Layer(
    clickedPoint,
    {color: "green"},
    t.layers.point[ln]
    );
  Map.layers().set(2, clickedPointLayer);

  var chart = ui.Chart.image.series({
    imageCollection: maskedColl.select(m.viirs.bands.data),
    region: clickedPoint,
    reducer: ee.Reducer.mean(),
    scale: 500,
  })
    .setSeriesNames([t.chart.series[ln]])
    .setOptions(s.chart.options);
  c.chart.panel.widgets().set(0, chart);
}

function responsiveApp(screen){
  print("Value of screen.is_desktop: ", screen.is_desktop);
  if (screen.is_desktop) {
      print("I'm DESKTOP");  // true case
  } else {
      print("I'm nything but desktop");  // false case
  }
  if (screen.is_desktop) {
      c.controlPanel.style().set({width: "25%"});  // true case
  } else {
      c.controlPanel.style().set({width: "50%"});  // false case
  }
}
// "is_mobile", "is_tablet", "is_desktop", "is_portrait"
// and "is_landscape", and numeric fields "width" and "height"

/*******************************************************************************
 * Initialize *
 ******************************************************************************/

// c.timeline.start.selector.setValue(m.date.start);
// c.timeline.end.selector.setValue(m.date.end);
c.selectProvince.selector.setValue(m.provinces.filtFieldVal);

// Render the map
Map.setOptions(c.basemap);
updateMap();
<<<<<<< HEAD

// Responsible app interface
ui.root.onResize(responsiveApp);
=======
>>>>>>> b8b571bb88954a7c7fad8acd84ae9cd20106ead5
