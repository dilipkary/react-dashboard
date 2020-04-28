import {deviation,mean} from 'd3';
import dataJson from './data';
export let initialData=(filterVal,filterList,measureVal)=>{
    let dataVal=[];
    let fl=[];
    fl.concat(filterList);
    let rawData=getAll(filterVal,filterList,measureVal);
    rawData.forEach(element => {
      dataVal=dataVal.concat(element.data.length>1?deviation(element.data).toFixed(2):(0).toFixed(2));
    });
   // alert(fl);
   console.log(fl);
    return dataVal;
  }
/**
 * @param {string} filter - The date
 * @param {string} measure - The string
 * @param {Object} filterList{} - object
 */
  export let getAll=(filter,filterList,measure)=>{

    let dataval=filterList.map((tp)=>{
        
        let ds=dataJson.map((val)=>{
            if(val[filter]==tp)
            {
                return val[measure];
            }
            
        })
        return {
            "name":tp,
            "data":ds.filter(x=>x)
        };//{[tp.replace(/ /g,"_")]:ds.filter(x => x)};
    });
    return dataval;
}
 
  export let updateChartData=(filterVal,filterList,measureVal)=>{
    let rawData=this.getAll(filterVal,filterList,measureVal);
    let labelVal=[];
    let dataVal=[];
    let alldata=[];
    let sdVal=0, lowerVal=0, upperVal=0,meanVal=0;
      rawData.forEach(element => {
        dataVal=dataVal.concat(element.data.length>0?mean(element.data):0);
        alldata=alldata.concat(element.data);
        labelVal=labelVal.concat(element.name);
      });
     
      sdVal=alldata.length>1?deviation(alldata):0;
      //console.log(deviation(alldata))
      meanVal=mean(alldata);
      upperVal=(meanVal+this.getCL(alldata.length>30?this.t_val[this.state.confidence]:this.t_value[this.state.confidence],
        sdVal,alldata.length));
      lowerVal=(meanVal-this.getCL(alldata.length>30?this.t_val[this.state.confidence]:this.t_value[this.state.confidence],
        sdVal,alldata.length));
      
      return{
        data:dataVal,
        labels:labelVal,
        sd:sdVal.toFixed(2),
        mean:meanVal>0?meanVal.toFixed(2):0,
        lower:lowerVal>0?lowerVal.toFixed(2):0,
        upper:upperVal>0?upperVal.toFixed(2):0
      }
    
  }

  //getData('topic','gas','intensity').filter(x => x);
  export let getData = (filter, filterValue, measure) => {

    let ds = dataJson.map((val) => {
      if (filterValue == 'all') {
        return val[measure];
      }
      else {
        if (val[filter] == filterValue) {
          return val[measure];
        }
      }

    })
    return ds;
  }
  //mean(data).toFixed(2)
  export let meanCal = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  //zscore, sd and length of data
  export let getCL = (z, sd, n) => {
    let d = z * (sd / n).toFixed(2);
    return parseFloat(d);
  }
  
  
export let updatechart=(label,data,measure)=>{ 
    this.setState({
      
    chartData:{
    labels: label,
    datasets: [
      {
        labels:measure,
        backgroundColor: '#4285e5b8',
        borderColor:  'blue',
        pointBorderColor: 'blue',
        pointBackgrounColor: '#4285e5b8',
        pointRadius: 5,
        data:data
      }
    ]
  }})
}