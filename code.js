// #############################################################################
// ### INITIAL PARAMETERS ###
// #############################################################################

// ### DATASETS ###

// Night-time imagery
var viirsCol = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
var dataBand = "avg_rad";
var cloudBand = "cf_cvg";

// Territory of interest: Vicenza Province
var borders = 
  ee.FeatureCollection("users/VicenzaInnovationLab/istat21-province-g")
  .filter(ee.Filter.eq("COD_REG", 5));  // Veneto Region Provinces
var nameAttr = "DEN_UTS";
var aoiName = "Vicenza";

// ### TIME PERIOD ###

var dateFormat = "YYYY-MM-dd";
var startDate = ee.Image(viirsCol.first()).date().format(dateFormat).getInfo();
var endDate = ee.Date(Date.now()).format(dateFormat).getInfo();

// ### STYLING ###

// Brand colors
var grigio0 = "#e4e4e4";  // 'Platinum', backgrounds
var grigio1 = "#a0a3a6";  // 'Quick Silver'
var rosso0 = "#f3a4a4";  // 'Mauvelous', backgrounds
var rosso1 = "#ea4f4d";  // 'Carmine Pink'
var rosso2 = "#e52323";  // 'Lust'
var rosso3 = "#b71c1a";  // 'Carnelian', titles
var blu = "#0d5a8c";  // 'Yale Blue', subtitles
var bluEE = "#3079ed";  // GEE links

var minVis = 0.0;
var maxVis = 70.0;
var nightColors = [
  "#000000", "#dd6e20", "#dd9740",
  "#e1b176", "#ecce96", "#ffffff"
];
var colorOpacity = 0.6;
var viirsVis = {
  min: minVis, max: maxVis,
  palette: nightColors, opacity: colorOpacity};
var borderVis = {color: "white", width: 2, fillColor: "ff000000"};

// Font

var appTitleStyle = {
  fontSize: "26px",
  fontWeight: "bold",
  color: rosso3
};

var graphText0 = {
  color: rosso2,
  fontSize: 14
};

var graphText1 = {
  color: rosso2,
  fontSize: 14,
  bold: false,
  italic: false
};

var graphText2 = {
  color: blu,
  fontSize: 12,
  bold: false,
  italic: false
};

var graphText3 = {
  color: blu,
  fontSize: 11,
  bold: false,
  italic: false
};

var aboutStyle = {
  textAlign: "left",
  stretch: "horizontal",
};

// ### STRINGS ###
var appTitle = ui.Label({
  value: "Esploratore dell'inquinamento luminoso",
  style: appTitleStyle
});
var gettingStarted = ui.Label({
  value: "Seleziona la provincia e il periodo per vedere l'intensità delle luci notturne. \
          Per vedere una dinamica in un punto specifico clicca sulla mappa. Aspetta un po' - \
          i calcoli che creano il grafico vengono eseguiti nel tempo reale.",
  style: {stretch: "horizontal", textAlign: "justify"},
});

var graphInterpTitle = ui.Label({
  value: "Riferimenti per interpretare il grafico",
  style: {fontWeight: "bold"},
});

var gi1 = ui.Label("Vicenza (VI: valore di ca. 50 nW/(cm²·sr)");
var gi2 = ui.Label(
  "Inquinamento luminoso molto alto. L'intero sfondo del cielo ha una vaga \
   tonalità bianca grigiastra. Forti sorgenti luminose sono evidenti in tutte \
   le direzioni. La Via Lattea è totalmente invisibile o quasi.");
var gi3 = ui.Label("Malo (VI): valore di ca. 20 nW/(cm²·sr)");
var gi4 = ui.Label(
  "Inquinamento luminoso abbastanza alto. La Via Lattea è molto debole o \
   invisibile vicino all'orizzonte e sembra piuttosto sbiadita sopra la testa. \
   Le sorgenti luminose sono evidenti nella maggior parte se non in tutte le direzioni.");
var gi5 = ui.Label("Sasso (VI): valore di ca. 5 nW/(cm²·sr)");
var gi6 = ui.Label(
  "Inquinamento luminoso moderato. Sono visibili solo strutture della \
          Via Lattea di grandi dimensioni. Tuttavia, un tale cielo è abbastanza \
          buono per gli standard di molte persone.");

var graphTitle = "Dinamica nel punto cliccato";

var funding = ui.Label({
  value: "Il progetto è parte del Programma Operativo Regionale del Fondo \
          Europeo di Sviluppo Regionale (POR FESR 2014-2020) del Veneto, \
          nell'ambito del bando dell'azione 231 volto alla “costituzione di \
          Innovation Lab diretti al consolidamento / sviluppo del network Centri \
          P3@-Palestre Digitali e alla diffusione della cultura degli Open Data”.",
  style: aboutStyle
});

// ### OTHER ###

var cloudThreshold = 1;
var bufRadius = 50;  // meters, in clicked point

// #############################################################################
// ### FUNCTIONS ###
// #############################################################################

var applyFilters = function (target_collection) {
  return target_collection
    .filter(ee.Filter.bounds(aoi))
    .filter(ee.Filter.date(startDate, endDate));
};

var maskClouds = function (img) {
  var mask = img.select(cloudBand).gte(cloudThreshold);
  return img.updateMask(mask);
};

var makeComposite = function (target_collection) {
  return target_collection.select(dataBand).mean().clip(aoi);
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
  aoiName = selectedName;
  print(aoiName);
  updateMap();
  Map.centerObject(aoi);
  chartPanel.widgets().set(0, chartPlaceHolder);
};

var startDateHandler = function (dateRange) {
  startDate = dateRange.start();
  updateMap();
};

var endDateHandler = function (dateRange) {
  endDate = dateRange.start();
  updateMap();
};

var cloudThreshHandler = function (value) {
  cloudThreshold = value;
  updateMap();
};

var updateMap = function () {
  aoi = borders.filter(ee.Filter.eq(nameAttr, aoiName));
  filteredColl = applyFilters(viirsCol);
  maskedColl = filteredColl.map(maskClouds);
  print("Immagini in collezione VIIRS:", maskedColl.size());
  composite = makeComposite(maskedColl);
  var compositeLayer = ui.Map.Layer(composite, viirsVis, "immagine temporalmente aggregata");
  var borderLayer = ui.Map.Layer(aoi.style(borderVis), {}, "limiti amministrativi");
  Map.layers().set(0, compositeLayer);
  Map.layers().set(1, borderLayer);
};

var mapClickHandler = function (coords) {
  var clickedPoint = ee.Geometry.Point(coords.lon, coords.lat).buffer(bufRadius);
  var clickedPointLayer = ui.Map.Layer(clickedPoint, {color: "pink"}, "punto cliccato");
  Map.layers().set(2, clickedPointLayer);

var chart = ui.Chart.image.series({
    imageCollection: maskedColl.select(dataBand),
    region: clickedPoint,
    reducer: ee.Reducer.mean(),
    scale: 500,
  }).setSeriesNames(["Radianza"])
    .setOptions({
      title: graphTitle,
      titleTextStyle: graphText1,
      vAxis: {
        title: "Radianza, nW/(cm²·sr)",
        textStyle: graphText3,
        titleTextStyle: graphText2,
        gridlines: {color: "#3b3b3b"}},
      hAxis: {
        title: "Data",
        textStyle: graphText3,
        titleTextStyle: graphText2,
        gridlines: {color: "#3b3b3b"},
      },
      curveType: "function",
      colors: ["#eed3a2"],
      legend: {textStyle: graphText2},
      chartArea: {backgroundColor: "#4e4e4e"},
      trendlines: {
        0: {  // add a trend line to the 1st series
          title: "Trend line",
          type: "polynomial",  // "linear", "polynomial" or "exponential"
          color: rosso2,
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

var aois = borders.aggregate_array(nameAttr).sort().getInfo();

// UI
var provinceSelector = ui.Select({
  items: aois,
  placeholder: "Seleziona un'area",
  value: aoiName,
  onChange: aoiNameHandler,
  // disabled,
  style: {stretch: "horizontal"}
});

var provinceLabel = ui.Label({
  value: "Scegli una provincia",
  style: {stretch: "vertical"}
});

var admPanel = ui.Panel({
  widgets: [provinceLabel, provinceSelector],
  layout: ui.Panel.Layout.flow('horizontal')
});

var startDateSelector = ui.DateSlider({
  start: startDate,
  // end,
  value: startDate,
  period: 1,
  onChange: startDateHandler,
  style: {width: "72%"}
});

var endDateSelector = ui.DateSlider({
  start: startDate,
  // end,
  value: endDate,
  period: 1,
  onChange: endDateHandler,
  style: {width: "72%"}
});

var startDateLabel = ui.Label({value: "Inizio: ", style: {stretch: "both"}});
var endDateLabel = ui.Label({value: "Fine: ", style: {stretch: "both",}});

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
  value: "👉 clicca sulla mappa per calcolare la serie temporale...",
  style: graphText0,
});
var chartPanel = ui.Panel();

var referencesLabel = ui.Label({
  value: "Più informazioni",
  style: {fontSize: "20px", fontWeight: "bold"}  //, textAlign : 'center', stretch: 'horizontal'},
});

var dataSource = ui.Label({
  value: "• Dati satellitari: VIIRS Stray Light Corrected Nighttime Day/Night Band Composites Version 1",
  targetUrl: "https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_DNB_MONTHLY_V1_VCMSLCFG"
});

var gitHub = ui.Label({
  value: "• Codice sorgente e documentazione: GitHub dell'Innovation Lab Vicenza",
  targetUrl: "https://github.com/VicenzaInnovationLab/ee-inquinamento-luminoso"
});

var mainPanel = ui.Panel({
  widgets: [
    appTitle,
    gettingStarted,
    makePanelBreak(),
    admPanel,
    datePanel,
    makePanelBreak(),
    // cloudPanel,
    // chart,
    chartPanel,
    // graphInterp,
    makePanelBreak(),
    graphInterpTitle,
    gi1, gi2, gi3, gi4, gi5, gi6
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
    palette: viirsVis.palette,
    bbox: [0, 0, 1, 0.1],
    dimensions: "100x10",
    format: "png",
  },
  style: {stretch: "horizontal", margin: "0px 8px", maxHeight: "20px"},
});

// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(viirsVis.min, {margin: "4px 8px", fontSize: "12px"}), //
    ui.Label((viirsVis.max / 2), {
      margin: "4px 8px",
      textAlign: "center",
      stretch: "horizontal",
      fontSize: "12px"
    }),
    ui.Label(viirsVis.max, {margin: "4px 8px", fontSize: "12px"})
  ],
  layout: ui.Panel.Layout.flow("horizontal")
});

var legendTitle = ui.Label({
  value: "Radianza media, nW/(cm²·sr)",
  style: {fontWeight: "bold", fontSize: "12px"}
});

var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels], null, {width: "25%"});

// Project info panel
var aboutInfoCloseButton = ui.Button({
  label: "Chiudi",
  onClick: function() {
    aboutInfoOpenButton.style().set("shown", true);
    aboutPanel.style().set("shown", false);
  },
  style: {position: "bottom-left", "shown": true}
});

var aboutInfoOpenButton = ui.Button({
  label: "Innovation Lab Vicenza",
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
    funding,
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

// ### CUSTOM BASEMAP ###
var darkMap = 
[{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}];
Map.setOptions({
  mapTypeId: "Mappa scura",
  styles: {"Mappa scura": darkMap},
  types: ["Mappa scura"]
});

// ### USER INTERFACE ###

ui.root.insert(2, mainPanel);
Map.add(legendPanel);
Map.onClick(mapClickHandler);

chartPanel.widgets().set(0, chartPlaceHolder);
updateMap();
Map.centerObject(aoi);