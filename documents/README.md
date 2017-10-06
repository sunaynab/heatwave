# HeatWave

## Background and Overview

In recent years, climate change has become a key focus for the global population. Scientists are noticing climate change patterns that could have potentially devastating effects on the well-being of the globe.

HeatWave demonstrates the trend of some of the key factors contributing to global warming. These factors include:

* Sea Levels
* Artic Sea Ice Minimums (Sept of each year)
* Global Average Temperatures
* CO2 Levels
* Polar Graph displaying all statistics

## Functionality & MVP

![HeatWaveApp](https://github.com/sunaynab/heatwave/blob/master/HeatWave.png)

Users are able to view these trends via a line graph displaying these trends. Users have the ability to adjust:

* Current Year
* Year Ranges
* Key Factors

Also included will be a brief summary of each factor and how it plays a role in determining the extent of global warming.

## Architecture and Technologies

* D3.js
* Webpack to bundle scripts
* Vanilla JavaScript for conditional rendering of different graphs

## Implementation Timeline

### Over the weekend:

* Collect and format all necessary data for creating graphs.
* Become familiar with d3 library
* Research and formulate summaries for each factor.

### Day 1:

Setup the Node modules, create `webpack.config.js` file for webpack. Create an entry file and write out the bare bones for each graph.

### Day 2:

* Create each graph using d3.
* Write mouseover events.

### Day 3:

* Write out logic for switching between graphs.
* Write out logic for adjusting year range.
* Write out logic for switching values when adjusting current year.
* Begin styling

### Day 4:

* Complete the styling of each graph.
* Create slider for adjusting year.
* Create buttons for toggling key factors
* Create inputs for adjusting year range.

## Bonus Features

* Create a graph that combines data from all key factors for each year.
* Create graphs that combine data for two key factors (CO2 levels + Global Temp and/or Global Temp + Sea levels)
