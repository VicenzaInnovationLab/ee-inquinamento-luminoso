/*******************************************************************************
 * Code style *
 * 
 *  - use camelCase for function and variable names
 *  - use double quotes " by default
 *  - use double space after your code in inline comments
 ******************************************************************************/

/*******************************************************************************
 * Model *
 ******************************************************************************/

// define a JSON object for storing the data model
var m = {};

// night-time imagery
m.viirs = {
  source: ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
  dataBand: "avg_rad",
  cloudBand: "cf_cvg",
  vis: {
    min: 0.0,
    max: 70.0,
    opacity: 0.6,
    palette: [
      "#000000", "#dd6e20", "#dd9740",
      "#e1b176", "#ecce96", "#ffffff"]
  }
};

// territory of interest
m.borders = {
  source: ee.FeatureCollection("users/VicenzaInnovationLab/istat21-province-g")
            .filter(ee.Filter.eq("COD_REG", 5)),  // Veneto Region provinces
  filtFieldName: "DEN_UTS",
  filtFieldVal: "Vicenza",
  vis: {color: "#ea4f4d", width: 2, fillColor: "ff000000"}
};

// time interval
m.dateFormat = "YYYY-MM-dd";
m.date = {
  start: ee.Image(m.viirs.source.first()).date().format(m.dateFormat).getInfo(),
  end: ee.Date(Date.now()).format(m.dateFormat).getInfo(),
};

// other
m.cloudThreshold = 1;
m.bufRadius = 50;  // in a clicked point, in meters

/*******************************************************************************
 * Translation *
 ******************************************************************************/

// app language: "it", "en" or "ru"
var ln = "it";  

// define a JSON object for storing translated text
var t = {};

t.mainTitle = {
  it: "Esploratore dell'inquinamento luminoso",
  en: "Light Pollution Explorer",
  ru: "Карта светового загрязнения",
};

t.intro = {
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
t.chart = {
  placeholder: {
    it: "👉 clicca sulla mappa per calcolare la serie temporale...",
    en: "👉 click on the map to calculate the time series...",
    ru: "👉 нажмите на карту, чтобы построить график...",
  },
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
t.provinceSelector = {
  it: "Scegli una provincia",
  en: "Select a province",
  ru: "Выберите провинцию",
};

t.dateSlider = {
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
 ******************************************************************************/

// define a JSON object for storing UI components
var c = {};

c.basemap = {
  mapTypeId: t.layers.map[ln],
  styles: {},
  types: [t.layers.map[ln]]
};
c.mainTitle = ui.Label(t.mainTitle[ln]);
c.intro = ui.Label(t.intro[ln]);
c.chartNote = {
  title: ui.Label(t.chartNote.title[ln]),
  section: {
    1: ui.Label(t.chartNote.section[1][ln]),
    2: ui.Label(t.chartNote.section[2][ln]),
    3: ui.Label(t.chartNote.section[3][ln]),
  },
  body: {
    1: ui.Label(t.chartNote.body[1][ln]),
    2: ui.Label(t.chartNote.body[2][ln]),
    3: ui.Label(t.chartNote.body[3][ln]),
  }
};
c.funding = ui.Label(t.funding[ln]);
c.provinceLabel = ui.Label(t.provinceSelector[ln]);
c.startDateLabel = ui.Label(t.dateSlider.start[ln]);
c.endDateLabel = ui.Label(t.dateSlider.end[ln]);
c.chartPlaceHolder = ui.Label(t.chart.placeholder[ln]);
c.ref = {
  title: ui.Label(t.ref.title[ln]),
  dataSource: ui.Label({
    value: t.ref.data[ln],
    targetUrl: "https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_DNB_MONTHLY_V1_VCMSLCFG"
  }),
  gitHub: ui.Label({
    value: t.ref.docs[ln],
    targetUrl: "https://github.com/VicenzaInnovationLab/ee-inquinamento-luminoso"
  })
};

/*******************************************************************************
 * Composition *
 ******************************************************************************/

// globals
var aoi, filteredColl, maskedColl, composite;
var aois = m.borders.source
            .aggregate_array(m.borders.filtFieldName).sort().getInfo();

var provinceSelector = ui.Select({
  items: aois,
  placeholder: t.chart.placeholder[ln],
  value: m.borders.filtFieldVal,
  onChange: aoiNameHandler
});

var provincePanel = ui.Panel({
  widgets: [c.provinceLabel, provinceSelector],
  layout: ui.Panel.Layout.flow("horizontal")
});

var startDateSelector = ui.DateSlider({
  start: m.date.start,
  value: m.date.start,
  period: 1,
  onChange: startDateHandler
});

var endDateSelector = ui.DateSlider({
  start: m.date.start,
  value: m.date.end,
  period: 1,
  onChange: endDateHandler
});

// panels

var startDatePanel = ui.Panel({
  widgets: [c.startDateLabel, startDateSelector],
  layout: ui.Panel.Layout.flow("horizontal")
});

var endDatePanel = ui.Panel({
  widgets: [c.endDateLabel, endDateSelector],
  layout: ui.Panel.Layout.flow("horizontal")
});

var datePanel = ui.Panel({
  widgets: [startDatePanel, endDatePanel],
});

var chartPanel = ui.Panel();

var mainPanel = ui.Panel({
  widgets: [
    c.mainTitle,
    c.intro,
    makePanelBreak(),
    provincePanel,
    datePanel,
    makePanelBreak(),
    chartPanel,
    makePanelBreak(),
    c.chartNote.title,
    c.chartNote.section[1], c.chartNote.body[1],
    c.chartNote.section[2], c.chartNote.body[2],
    c.chartNote.section[3], c.chartNote.body[3],
  ],
  style: {width: "25%", border: "1px solid black", padding: "10px"}
});

// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: {
    min: 0,
    max: 1,
    palette: m.viirs.vis.palette,
    bbox: [0, 0, 1, 0.1],
    dimensions: "100x10",
    format: "png",
  },
  style: {stretch: "horizontal", margin: "0px 8px", maxHeight: "20px"},
});

// create a panel with three numbers for the legend
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(m.viirs.vis.min, {margin: "4px 8px", fontSize: "12px"}), //
    ui.Label((m.viirs.vis.max / 2), {
      margin: "4px 8px",
      textAlign: "center",
      stretch: "horizontal",
      fontSize: "12px"
    }),
    ui.Label(m.viirs.vis.max, {margin: "4px 8px", fontSize: "12px"})
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


var projectLogo = ui.Thumbnail({
    image: ee.Image("users/VicenzaInnovationLab/logo-progetto"),
    params: {min: 0, max: 255},
    style: {width: "200px"}
});

var aboutPanel = ui.Panel({  // create a panel, initially hidden
  style: {
    width: "400px",
    shown: false
  },
  widgets: [
    projectLogo,
    c.funding,
    c.ref.title,
    c.ref.dataSource,
    c.ref.gitHub,
    aboutInfoCloseButton]
});

Map.add(aboutInfoOpenButton);
ui.root.insert(0, aboutPanel);

ui.root.insert(2, mainPanel);
Map.add(legendPanel);
Map.onClick(mapClickHandler);

chartPanel.widgets().set(0, c.chartPlaceHolder);
updateMap();
Map.centerObject(aoi);

/*******************************************************************************
 * Styling *
 ******************************************************************************/

// define a JSON object for defining CSS-like class style properties
var s = {};

s.colors = {
  brand: {
    grigio0: "#e4e4e4",  // backgrounds
    grigio1: "#a0a3a6",
    rosso0: "#f3a4a4",  // backgrounds
    rosso1: "#ea4f4d",
    rosso2: "#e52323",
    rosso3: "#b71c1a",  // titles
    blu: "#0d5a8c",  // subtitles
  },
  chart: {
    mainCurve: "#eed3a2",
    trend: "#e52323",
    areaBackground: "#4e4e4e",
    gridline: "#3b3b3b",
  },
};

s.mainTitle = {
  fontSize: "26px",
  fontWeight: "bold",
  color: s.colors.brand.rosso3
};
s.intro = {textAlign: "justify", stretch: "horizontal"};
s.chartNote = {
  title: {fontWeight: "bold"},
  section: {color: s.colors.brand.rosso1}
};
s.chart = {
  placeholder: {
    color: s.colors.brand.rosso2,
    fontSize: 14
  },
  title: {
    color: s.colors.brand.blu,
    fontSize: 16,
    bold: true,
    italic: false
  },
  axis: {
    color: s.colors.brand.blu,
    fontSize: 12,
    bold: false,
    italic: false
  },
  default: {
    color: s.colors.brand.blu,
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
c.intro.style().set(s.intro);
c.chartNote.title.style().set(s.chartNote.title);
c.chartNote.section[1].style().set(s.chartNote.section);
c.chartNote.section[2].style().set(s.chartNote.section);
c.chartNote.section[3].style().set(s.chartNote.section);

c.funding.style().set(s.aboutText);
c.chartPlaceHolder.style().set(s.chart.placeholder);

c.provinceLabel.style().set({stretch: "vertical"});
provinceSelector.style().set({stretch: "horizontal"});

c.startDateLabel.style().set({stretch: "both"});
c.endDateLabel.style().set({stretch: "both"});

startDateSelector.style().set({width: "72%"});
endDateSelector.style().set({width: "72%"});

c.ref.title.style().set({fontSize: "20px", fontWeight: "bold"});

c.basemap.styles[t.layers.map[ln]] = s.darkMap;
Map.setOptions(c.basemap);

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

function applyFilters(target_collection) {
  return target_collection
    .filter(ee.Filter.bounds(aoi))
    .filter(ee.Filter.date(m.date.start, m.date.end));
}

function maskClouds(img) {
  var mask = img.select(m.viirs.cloudBand).gte(m.cloudThreshold);
  return img.updateMask(mask);
}

function makeComposite(target_collection) {
  return target_collection.select(m.viirs.dataBand).mean().clip(aoi);
}

// GUI

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
  m.borders.filtFieldVal = selectedName;
  print(m.borders.filtFieldVal);
  updateMap();
  Map.centerObject(aoi);
  chartPanel.widgets().set(0, c.chartPlaceHolder);
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
  m.cloudThreshold = value;
  updateMap();
}

function updateMap() {
  aoi = m.borders.source.filter(ee.Filter.eq(m.borders.filtFieldName, m.borders.filtFieldVal));
  filteredColl = applyFilters(m.viirs.source);
  maskedColl = filteredColl.map(maskClouds);
  print("Immagini in collezione VIIRS:", maskedColl.size());
  composite = makeComposite(maskedColl);
  var compositeLayer = ui.Map.Layer(composite, m.viirs.vis, t.layers.raster[ln]);
  var borderLayer = ui.Map.Layer(aoi.style(m.borders.vis), {}, t.layers.vector[ln]);
  Map.layers().set(0, compositeLayer);
  Map.layers().set(1, borderLayer);
}

function mapClickHandler(coords) {
  var clickedPoint = ee.Geometry.Point(coords.lon, coords.lat).buffer(m.bufRadius);
  var clickedPointLayer = ui.Map.Layer(clickedPoint, { color: "pink" }, t.layers.point[ln]);
  Map.layers().set(2, clickedPointLayer);

  var chart = ui.Chart.image.series({
    imageCollection: maskedColl.select(m.viirs.dataBand),
    region: clickedPoint,
    reducer: ee.Reducer.mean(),
    scale: 500,
  })
    .setSeriesNames([t.chart.series[ln]])
    .setOptions({
      title: t.chart.title[ln],
      titleTextStyle: s.chart.title,
      vAxis: {
        title: t.chart.vAxis[ln],
        textStyle: s.chart.default,
        titleTextStyle: s.chart.axis,
        gridlines: { color: s.colors.chart.gridline }
      },
      hAxis: {
        title: t.chart.hAxis[ln],
        textStyle: s.chart.default,
        titleTextStyle: s.chart.axis,
        gridlines: { color: s.colors.chart.gridline },
      },
      curveType: "function",
      colors: [s.colors.chart.mainCurve],
      legend: { textStyle: s.chart.axis },
      chartArea: { backgroundColor: s.colors.chart.areaBackground },
      trendlines: {
        0: {
          title: t.chart.trend[ln],
          type: "polynomial",
          color: s.colors.chart.trend,
          lineWidth: 3,
          opacity: 0.9,
          visibleInLegend: true,
        }
      }
    });

  chartPanel.widgets().set(0, chart);
}

/*******************************************************************************
 * Initialize *
 ******************************************************************************/

/* Example
// Selected year.
m.year = 2020;
*/
