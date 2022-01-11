<p align="center"><img src="img/logo-innovationlab.png" alt="Logo dell'Innovation Lab Vicenza" width="400"></p>
<h1 align="center">Esploratore dell'inquinamento luminoso</h1>
<p align="right">a cura del <a href="https://digitalinnovationhubvicenza.it/">Digital Innovation Hub Vicenza</a></p>

<p align="justify">
Esplora la dinamica dell'inquinamento luminoso nel vicentino usando la nostra web app basata su Google Earth Engine, una piattaforma big data, e immagini satellitari NASA.
</p>

[<p align="center"><img src="img/webapp-button-blue.png" alt="open web app button" width="200"></p>](https://vicenzainnovationlab.users.earthengine.app/view/inquinamento-luminoso)

<p align="center"><img  src="img/app-cover-full.png" alt="app screenshot" width="600"></p>

<p align="justify"><i>Il progetto è parte del Programma Operativo Regionale del Fondo Europeo di Sviluppo Regionale (POR FESR 2014 - 2020) del Veneto, nell'ambito del bando dell'azione 231 volto alla "costituzione di Innovation Lab diretti al consolidamento/sviluppo del network Centri P3@-Palestre Digitali e alla diffusione della cultura degli Open Data."</i></p>
<p align="center"><img src="img/logo-partecipanti.png" alt="logo of participants" width="700"></p>

## Indice
1. [Introduzione](#introduzione)
2. [Web App](#web-app)
   1. [Come usare la web app](#come-usare-la-web-app)
   2. [Come interpretare la mappa e il grafico?](#come-interpretare-la-mappa-e-il-grafico)
3. [Codice sorgente](#codice-sorgente)
   1. [Struttura del repository](#struttura-del-repository)
   2. [Come usare il codice](#come-usare-il-codice)
4. [Licenza](#licenza)
5. [Contatti](#contatti)
6. [Ringraziamenti](#ringraziamenti)

## Introduzione

La luce che le nostre città emettono costantemente è dispersa nell'ambiente. Parte di questa luce, che viene emessa verso l'alto, viene registrata dai satelliti NOAA-20 e Suomi-NPP. Grazie a questi satelliti, abbiamo misurazioni medie mensili della quantità di luce in ogni punto della Terra, espressa in *nanowatt diviso per centimetro quadrato per steradiante*. Possiamo vedere come questi valori cambiano negli ultimi anni. Ad esempio, il passaggio all'illuminazione esterna a risparmio energetico porta a una riduzione della perdita di luce, che è evidente anche dallo spazio. La costruzione di nuove aree residenziali e infrastrutture, al contrario, aumenta l'inquinamento luminoso.

Questo repository contiene il codice JavaScript che abbiamo utilizzato per l'elaborazione dei dati e per generare la web app. Consente di studiare le dinamiche della quantità della luce notturna (artificiale), dispersa nell'ambiente verso il cielo a partire dal 2014. I dati utilizzati per la ricostruzione di tali dinamiche sono le immagini notturne della Terra [VIIRS Stray Light Corrected Nighttime Day/Night Band Composites Version 1](https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_DNB_MONTHLY_V1_VCMSLCFG) di pubblico dominio, ottenute e elaborate tramite Earth Engine.

## Web App

### Come usare la web app

1. Quando la [web app](https://vicenzainnovationlab.users.earthengine.app/view/monitoraggio-aria) è aperta (potrebbero volerci alcuni secondi per caricarla), si apre una mappa della provincia di Vicenza, dove la diversa intensità del colore giallo-arancio mostra la radianza di un determinato territorio. Questa mappa mostra le medie per il periodo prescelto (vedi sotto).

2. Dall'elenco a tendina è possibile selezionare un'altra provincia del Veneto.

3. Per impostazione predefinita, l'intervallo di date è impostato dal 1° gennaio 2014 fino a oggi. Puoi cambiarlo. Tuttavia, la data di inizio non può essere precedente al 01/01/2014 a causa della mancanza di dati.

4. Ora la cosa più interessante: ingrandisci la mappa nell'area di tuo interesse e fai un clic sinistro. Nel pannello a destra, apparirà un grafico con una curva gialla, che mostra la dinamica dell'inquinamento luminoso a questo punto per il periodo selezionato. Il grafico mostra anche una trend line rossa (o meglio, una curva di tendenza polinomiale).

5. In alto a destra del grafico c'è un pulsante che consente di espanderlo in una finestra separata. In quella nuova finestra sarà possibile scaricare i dati iniziali del grafico nel formato CSV.

### Come interpretare la mappa e il grafico?

Ecco un riferimento:
- **Vicenza (VI), 50 nW/(cm²·sr)**. Inquinamento luminoso molto alto. L'intero sfondo del cielo ha una vaga tonalità bianca grigiastra. Forti sorgenti luminose sono evidenti in tutte le direzioni. La Via Lattea è totalmente invisibile o quasi.
- **Malo (VI), 20 nW/(cm²·sr)**. Inquinamento luminoso abbastanza alto. La Via Lattea è molto debole o invisibile vicino all'orizzonte e sembra piuttosto sbiadita sopra la testa. Le sorgenti luminose sono evidenti nella maggior parte se non in tutte le direzioni.
- **Sasso (VI), 5 nW/(cm²·sr)**. Inquinamento luminoso moderato. Sono visibili solo strutture della Via Lattea di grandi dimensioni. Tuttavia, un tale cielo è abbastanza buono per gli standard di molte persone.

## Codice sorgente

### Struttura del repository

- `img/` - cartella con le immagini usate in questo readme
- `code.js` - codice della web app per Earth Engine
- `LICENSE.md` - file della licenza
- `README.md` - questo file

### Come usare il codice

Il codice è stato sviluppato per essere eseguito all'interno della  piattaforma big data che si chiama [Google Earth Engine](https://earthengine.google.com/). In caso se vuoi esaminare gli algoritmi sottostanti o produrre una web app derivata è necessario avere un account gratuito Earth Engine. Se vuoi invece solo utilizzare la web app, basta [aprire il link](https://vicenzainnovationlab.users.earthengine.app/view/monitoraggio-aria).

Non appena hai l'account Earth Engine, esplora la sua interfaccia con [questo manuale](https://developers.google.com/earth-engine/guides/playground). Poi basta copiare il codice dal file `code.js` da questo repository a uno script Earth Engine per esiguirlo.

## Licenza

<img align="right" src="img/iodl.png" alt="Italian Open Data License logo" width="200">
La IODL 2.0 (Italian Open Data License) prevede che l’utente possa liberamente:

- consultare, estrarre, scaricare, copiare, pubblicare, distribuire e trasmettere le informazioni;
- creare un lavoro derivato, per esempio attraverso la combinazione con altre informazioni (c.d. mashup), includendole in un prodotto o sviluppando un’applicazione informatica che le utilizzi come base dati.

In cambio, all’utente è chiesto solo d'indicare la fonte delle informazioni e il nome del soggetto che fornisce il dato, includendo, se possibile, un link alla licenza. Vedi il file [LICENSE.md](LICENSE.md) per dettagli.

## Contatti

- Sito ufficiale: [InnovationLab Vicenza - Comune di Vicenza](https://www.comune.vicenza.it/uffici/cms/innovationlabvicenza.php)
- Sito sviluppatore: [Digital Innovation Hub Vicenza](https://digitalinnovationhubvicenza.it/)
- Email ufficiale: <vicenzainnovationlab@comune.vicenza.it>
- Email sviluppatore: <info@digitalinnovationhubvicenza.it>

## Ringraziamenti

Ringraziamo [Vasily Lobanov](https://www.linkedin.com/in/lobanov-v/) del Centro Earth Observation della [RUDN University](https://eng.rudn.ru/) per il prezioso supporto nello sviluppo della interfaccia grafica della web app.
