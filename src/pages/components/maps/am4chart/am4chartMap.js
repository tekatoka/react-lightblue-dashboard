import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";

import cities from './cities';
//import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/usaHigh";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";

//import AnimateNumber from 'react-animated-number';
import s from './am4chartMap.module.scss';

import Modal from "../../modals/Modal";
  
  class Am4chartMap extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
          modalVisible: false,
          selectedCity: ''
        };
      this.setSelectedCity = this.setSelectedCity.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
    }

    setSelectedCity = (selectedCity) => {
      this.setState({
        selectedCity: selectedCity
      });
    };

    toggleModal = (show) => {
        this.setState({
          modalVisible: show
        });
      };

  componentDidMount() {
    let map = am4core.create("map", am4maps.MapChart);
    map.geodata = am4geodata_worldHigh;
    map.percentHeight = 100;
    map.dy = 10;
    map.projection = new am4maps.projections.Miller();
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    map.homeZoomLevel = 4.6;
    map.homeGeoPoint = {
      latitude: 55,
      longitude: 55
    };
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.layout = 'horizontal';
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'bottom';
    map.zoomControl.dy = -10;
    map.zoomControl.contentHeight = 20;
    map.zoomControl.minusButton.background.fill = am4core.color("#C7D0FF");
    map.zoomControl.minusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.minusButton.label.fontWeight = 600;
    map.zoomControl.minusButton.label.fontSize = 22;
    map.zoomControl.minusButton.scale = .75;
    map.zoomControl.minusButton.label.scale = .75;
    map.zoomControl.plusButton.background.fill = am4core.color("#C7D0FF");
    map.zoomControl.plusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.plusButton.label.fontWeight = 600;
    map.zoomControl.plusButton.label.fontSize = 22;
    map.zoomControl.plusButton.label.align = "center";
    map.zoomControl.plusButton.scale = .75;
    map.zoomControl.plusButton.label.scale = .75;
    map.zoomControl.plusButton.dx = 5;
    let plusButtonHoverState = map.zoomControl.plusButton.background.states.create("hover");
    plusButtonHoverState.properties.fill = am4core.color("#354D84");
    let minusButtonHoverState = map.zoomControl.minusButton.background.states.create("hover");
    minusButtonHoverState.properties.fill = am4core.color("#354D84");
    let polygonTemplate = polygonSeries.mapPolygons.template;
    //polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#474D84");
    polygonTemplate.stroke = am4core.color("#6979C9")
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#354D84");
    let citySeries = map.series.push(new am4maps.MapImageSeries());
    citySeries.data = cities;
    citySeries.dataFields.value = "size";
    let cityTemplate = citySeries.mapImages.template;
    cityTemplate.nonScaling = true;
    cityTemplate.propertyFields.latitude = "latitude";
    cityTemplate.propertyFields.longitude = "longitude";
    let circle = cityTemplate.createChild(am4core.Circle);
    circle.fill = am4core.color("#C7D0FF");
    circle.strokeWidth = 0;
    let circleHoverState = circle.states.create("hover");
    circleHoverState.properties.strokeWidth = 1;
    circle.tooltipText = '{name}';
    circle.showTooltip=true;
    circle.propertyFields.radius = 'size';

// Add line series
var lineSeries = map.series.push(new am4maps.MapSplineSeries());
lineSeries.mapLines.template.stroke = am4core.color("#e03e96");
lineSeries.mapLines.template.line.strokeWidth = 4;
lineSeries.mapLines.template.line.nonScalingStroke = true;
lineSeries.mapLines.template.line.strokeDasharray = "5 3";
lineSeries.mapLines.template.line.adapter.add("strokeWidth", function(strokeWidth, target){
  target.strokeDasharray = (5 / map.zoomLevel) + " " + (3 / map.zoomLevel)
  return strokeWidth;
});

lineSeries.data = [{
  "multiGeoLine": [
    [
      { "latitude": 52.520008, "longitude": 13.404954 },
      { "latitude": 59.937500, "longitude": 30.308611 },
      { "latitude": 55.751244, "longitude": 37.618423 },
      { "latitude": 55.78874, "longitude": 49.12214 },
      { "latitude": 56.833332, "longitude": 60.583332 },
      { "latitude": 56.01839, "longitude": 92.86717 },
      { "latitude": 52.29778, "longitude": 104.29639 }
    ]
  ]
}]

// Creating a pin bullet
var pin = cityTemplate.createChild(am4plugins_bullets.PinBullet);
// Configuring pin appearance
pin.background.fill = am4core.color("#C7D0FF");
pin.background.pointerBaseWidth = 5;
pin.background.pointerLength = 55;
pin.background.propertyFields.pointerLength = "length";
pin.background.pointerAngle = 90; //bottom: 270
pin.circle.fill = pin.background.fill;
pin.label = new am4core.Label();
pin.label.text = "{date}";
pin.label.fontSize="12px";
pin.label.fill = am4core.color("rgba(7, 27, 82, 1)");

cityTemplate.events.on("hit", (ev) => {
  // zoom to an object
  ev.target.series.chart.zoomToMapObject(ev.target);
  this.setSelectedCity(ev.target.dataItem.dataContext.name);
  this.toggleModal(true);
});

var label = pin.createChild(am4core.Label);
label.text = "{name}";
label.fontWeight = "bold";
label.position = "bottom";
label.propertyFields.dy = "length";
label.verticalCenter = "middle";
label.fill = am4core.color("#C7D0FF");
label.adapter.add("dy", function(dy) {
  return (120 + dy) * -1;
});

    this.map = map;
  }

  componentWillUnmount() {
    if(this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
        <React.Fragment>
                  {
                  this.state.modalVisible && 
                  <div className={`${s.modalWrapper} }`}>
                    <div 
                        className={`py-0 animate__animated animate__faster animate__fadeInUp `}
                    >
                        <Modal title={this.state.selectedCity} toggleModal={this.toggleModal} />
                    </div>
                  </div>
                }
      <div className={s.map} id="map">
        
        </div>
      </React.Fragment>
    );
  }
}

export default Am4chartMap;

{
  //<div className={s.mapChart}>
    
    // <div className={s.stats}>
    //   <h6 className="mt-1">GEO-LOCATIONS</h6>
    //   <p className="h3 m-0">
    //     <span className="mr-xs fw-normal">
    //       <AnimateNumber
    //         value={1656843}
    //         initialValue={0}
    //         duration={1000} 
    //         stepPrecision={0}
    //         formatValue={n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
    //       /></span>
    //     <i className="fa fa-map-marker" />
    //   </p>
    // </div>
  
    //</div>
    }
