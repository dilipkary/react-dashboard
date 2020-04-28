import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import './App.css';
import { Container, Jumbotron, Card } from 'react-bootstrap';
import { Filters,Measures,Confidence,Swot }/* ,{Swot,Confidence,Measures} */ from './Components/inputs'
import DatatablePage from './Components/datatable';
import dataJson from './Components/data';
import {deviation,mean} from 'd3';
import {getAll,initialData,getCL,getData,updateChartData,updatechart,} from './Components/functions';


class App extends Component {
  constructor(props,) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      labels:[...new Set(dataJson.map(a => a.topic))].filter(x => x).sort(),
      data:initialData(this.filterVal,this.filterList,this.measureVal),
      selectedFilter:'topic',
      selectedMeasure:'intensity',
      selectedConfidence:'95',
      selectedItem:'all',
      //input state
      topiclist: 'enable',
      regionlist: 'disable',
      pestlelist: 'disable',
      yearlist: 'disable',
      filter: 'topic',
      chartData:{
        labels: [...new Set(dataJson.map(a => a.topic))].filter(x => x).sort(),
        datasets: [
          {
            label:this.measureVal,
            backgroundColor: '#4285e5b8',
            borderColor:  'blue',
            pointBorderColor: 'blue',
            pointBackgrounColor: '#4285e5b8',
            pointRadius: 5,
            data:initialData(this.filterVal,[...new Set(dataJson.map(a => a.topic))].filter(x => x).sort(),this.measureVal)
          }
        ]
      },
      filterlist_val: [...new Set(dataJson.map(a => a.topic))].filter(x => x).sort(),

      measure:'intensity',

      confidence: this.confidenceVal,

      CL: '95',

      mean: mean(getData(this.filterVal, this.initialSelect, this.measureVal).filter(x => x)).toFixed(2),

      lower: (mean(getData(this.filterVal, this.initialSelect, this.measureVal).filter(x => x)).toFixed(2) -
        getCL(this.initialTvalue,
          deviation(getData(this.filterVal, this.initialSelect, this.measureVal).filter(x => x)).toFixed(2),
          getData(this.filterVal, this.initialSelect, this.measureVal).filter(x => x).length)).toFixed(2),

      upper: (parseFloat(mean(getData(this.filterVal, this.initialSelect, this.measureVal).filter(x => x))) +
        parseFloat(getCL(this.initialTvalue,
          deviation(getData(this.filterVal, this.initialSelect, this.measureVal).filter(x => x)).toFixed(2),
          getData(this.filterVal, this.initialSelect, this.measureVal).filter(x => x).length))).toFixed(2),

      sd: deviation(getData(this.filterVal, this.initialSelect, this.measureVal).filter(x => x)).toFixed(2)

    }
    this.updateHandler = this.updateHandler.bind(this);
    this.update=this.update.bind(this);
  }

   t_value = {
    "90": [1.645, 6.314, 2.92, 2.353, 2.132, 2.015, 1.943, 1.895, 1.86, 1.833, 1.812, 1.796, 1.782, 1.771, 1.761, 1.753, 1.746, 1.74, 1.734, 1.729, 1.725, 1.721, 1.717, 1.714, 1.711, 1.708, 1.706, 1.703, 1.701, 1.699, 1.697],
    "95": [1.96, 12.706, 4.303, 3.182, 2.776, 2.571, 2.447, 2.365, 2.306, 2.262, 2.228, 2.201, 2.179, 2.16, 2.145, 2.131, 2.12, 2.11, 2.101, 2.093, 2.086, 2.08, 2.074, 2.069, 2.064, 2.06, 2.056, 2.052, 2.048, 2.045, 2.042],
    "99": [1, 63.656, 9.925, 5.841, 4.604, 4.032, 3.707, 3.499, 3.355, 3.25, 3.169, 3.106, 3.055, 3.012, 2.977, 2.947, 2.921, 2.898, 2.878, 2.861, 2.845, 2.831, 2.819, 2.807, 2.797, 2.787, 2.779, 2.771, 2.763, 2.756, 2.75]
  }
  //greator than 30
   t_val = {
    "90": 1.645,
    "95": 1.96,
    "99": 2.58
  }
   filterVal='topic';
    filterList=[...new Set(dataJson.map(a => a.topic))].filter(x => x).sort();
    measureVal='intensity';
    initialSelect='all';
    initialTvalue=this.t_val['95'];
    confidenceVal='95';
    update(updata) {
      let filter=updata.filter===0?this.state.filter:updata.filter;
      let filterList=updata.filterVal===0?this.state.filterlist_val:updata.filterVal;
      let measure=updata.measure===0?this.state.measure:updata.measure;
      let confidence=updata.confidence===0?this.state.confidence:updata.confidence;
      
      let rawData=getAll(filter,filterList,measure);
      let labelVal=[];
      let dataVal=[];
      let alldata=[];
      console.log(filter,rawData,this.state.measure,confidence);
      let sdVal=0, lowerVal=0, upperVal=0,meanVal=0;
        rawData.forEach(element => {
          dataVal=dataVal.concat(mean(element.data));
          alldata=alldata.concat(element.data);
          labelVal=labelVal.concat(element.name);
        });
       
        sdVal=alldata.length>1?deviation(alldata):0;
        //console.log(deviation(alldata))
        meanVal=mean(alldata);
        upperVal=(meanVal+getCL(alldata.length>30?this.t_val[confidence]:this.t_value[confidence],
          sdVal,alldata.length));
        lowerVal=(meanVal-getCL(alldata.length>30?this.t_val[confidence]:this.t_value[confidence],
          sdVal,alldata.length));
          console.log(dataVal);
      this.setState({
        chartData: {
          labels: labelVal,
          datasets: [
            {
              label: measure,
              backgroundColor: '#4285e5b8',
              borderColor: 'blue',
              pointBorderColor: 'blue',
              pointBackgrounColor: '#4285e5b8',
              pointRadius: 5,
              data: dataVal
            }
          ]
        },
          data:dataVal,
          labels:labelVal,
          sd:sdVal.toFixed(2),
          mean:meanVal>0?meanVal.toFixed(2):0,
          lower:lowerVal>0?lowerVal.toFixed(2):0,
          upper:upperVal>0?upperVal.toFixed(2):0
      });
    }
updateHandler(dt){
  this.update(dt)
  alert(dt.filter);
}
  render() {
    return (
      <div className="App">
        <div className="my-container">
          <div className="row">
            <div className="col-8">
              <div>
                <span>CL = {this.state.confidence}% | μ = {this.state.mean} | σ = {this.state.sd} | Lower = {this.state.lower} | Upper = {this.state.upper}</span>
                <Radar ref={this.chartReference} data={this.state.chartData} />
                {/* <Chart1 labels={this.state.labels} measure={this.state.measure} data={this.state.data}></Chart1> */}
              </div>
            </div>
            <div className="col-4">
              {/* <DisplayComp></DisplayComp> */}
              <div className="row" style={{ marginTop: 15 }}>
                <div className="col-12">
                  <Card style={{ width: '97%' }}>
                    <Card.Body>
                      {/* <Card.Title>Card Title</Card.Title> */}
                      <Card.Subtitle className="mb-2 float-left text-muted"></Card.Subtitle>
                      <Card.Text >
                        <h5>Click On Node</h5>
                        <h6>filter={this.state.filter}</h6>
                        <h6>filtervalue={this.state.filterlist_val[0]}</h6>
                        <h6>Measures={this.state.measure}</h6>
                        <h6>Confidence={this.state.confidence}</h6>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="row" style={{ marginTop: 15 }}>
                <div className="col-12">
                  <Card style={{ width: '97%' }}>
                    <Card.Body>
                      {/* <Card.Title>Card Title</Card.Title> */}
                      <Card.Subtitle className="mb-2 float-left text-muted">Year Range</Card.Subtitle>
                      <Card.Text >

                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="row" style={{ marginTop: 15 }}>
                <div className="col-8">
                  <Filters alertmsg={this.updateHandler} />
                </div>
                <div className="col-4">
                  <div className="row" >
                    <Measures alertmsg={this.updateHandler} />
                  </div>
                  <div className="row" style={{ marginTop: 15 }}>
                    <Confidence alertmsg={this.updateHandler} />
                  </div>
                  <div className="row" style={{ marginTop: 15 }}>
                    <Swot />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <DatatablePage ></DatatablePage>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
export default App;
