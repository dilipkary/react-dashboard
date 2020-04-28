import React from 'react'
import { Container, Jumbotron, Card } from 'react-bootstrap';
import dataJson from './data';
import { deviation, mean } from 'd3';
let topic = dataJson.map(a => a.topic);
topic = [...new Set(topic)].filter(x => x).sort();
let region = dataJson.map(a => a.region);
region = [...new Set(region)].filter(x => x).sort();
let pestle = dataJson.map(a => a.pestle);
pestle = [...new Set(pestle)].filter(x => x).sort();
let year = dataJson.map(a => a.end_year);
year = [...new Set(year)].filter(x => x).sort();


export class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            selectedFilter: 'topic',
            selectedMeasure: 'intensity',
            selectedConfidence: '95',
            selectedItem: 'all',
            topiclist: 'enable',
            regionlist: 'disable',
            pestlelist: 'disable',
            yearlist: 'disable',
            filter: 'topic',
            filterList:[...new Set(dataJson.map(a => a.topic))].filter(x => x).sort()
        };
        this.props.alertmsg.bind(this)
        // this.objectRef = React.createRef();
        this.handlerFilterValue = this.handlerFilterValue.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

    }
    
    handleFilter(event) {
        this.setState({ 
          filter: event.target.value,
          filterlist_val:[...new Set(dataJson.map(a => a.topic))].filter(x => x).sort(),
          selectedFilter:event.target.value
         });
        // this.props.alertmsg()

         switch (event.target.getAttribute('id')) {
            case 'topic': this.setState({ topiclist: 'enable' });
              this.setState({ regionlist: 'disable' });
              this.setState({ pestlelist: 'disable' });
              this.setState({ yearlist: 'disable' });
              break;
            case 'region': this.setState({ topiclist: 'disable' });
              this.setState({ regionlist: 'enable' });
              this.setState({ pestlelist: 'disable' });
              this.setState({ yearlist: 'disable' });
              break;
            case 'pestle': this.setState({ topiclist: 'disable' });
              this.setState({ regionlist: 'disable' });
              this.setState({ pestlelist: 'enable' });
              this.setState({ yearlist: 'disable' });
              break;
            case 'year': this.setState({ topiclist: 'disable' });
              this.setState({ regionlist: 'disable' });
              this.setState({ pestlelist: 'disable' });
              this.setState({ yearlist: 'enable' });
              break;
            default:
            // code block
          }
          this.props.alertmsg({
              filter:event.target.value,
              filterVal:[...new Set(dataJson.map(a => a[event.target.value]))].filter(x => x).sort()
          });
        }
        handlerFilterValue(event) {
            this.props.alertmsg(
                {
                    filter:this.state.filter,
                    filterVal:[event.target.value],
                    measure:0,
                    confidence:0
                }
            );
            this.setState({ filterlist_val: [event.target.value/* .replace(/'/g,'') */] }/* ,console.log(this.state) */);            
          }

    render() {
        return (
            <Card /* style={{ width: '18rem' }} */>
                <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}
                    <Card.Subtitle className="mb-2 float-left text-muted">Filters</Card.Subtitle>
                    <Card.Text className="text-left">

                        <br></br>
                        <input checked={this.state.selectedFilter === 'topic'} onChange={this.handleFilter} className="text-left" id="topic" name="filters" value="topic" type="radio" /><span style={{ paddingLeft: 5 }}>Topic</span><br></br>
                        <select className="float-left col-10" disabled={(this.state.topiclist === 'disable') ? "disabled" : ""} id="topiclist" onChange={this.handlerFilterValue} >
                            <option value="all">All</option>
                            {topic.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <br></br><br></br>
                        <input checked={this.state.selectedFilter === 'region'} onChange={this.handleFilter} className="text-left" id="region" name="filters" value="region" type="radio" /><span style={{ paddingLeft: 5 }}>Region</span><br></br>
                        <select className="float-left col-10" id="regionlist" disabled={(this.state.regionlist === "disable") ? "disabled" : ""} onChange={this.handlerFilterValue}>
                            <option value="all">All</option>
                            {region.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <br></br><br></br>
                        <input checked={this.state.selectedFilter === 'pestle'} onChange={this.handleFilter} className="text-left" id="pestle" name="filters" value="pestle" type="radio" /><span style={{ paddingLeft: 5 }}>Pestle</span><br></br>
                        <select className="float-left col-10" disabled={(this.state.pestlelist === "disable") ? "disabled" : ""} id="pestlelist" onChange={this.handlerFilterValue}>
                            <option value="all">All</option>
                            {pestle.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <br></br><br></br>
                        <input checked={this.state.selectedFilter === 'end_year'} onChange={this.handleFilter} className="text-left" id="year" name="filters" value="end_year" type="radio" /><span style={{ paddingLeft: 5 }}>Year</span><br></br>
                        <select className="float-left col-10" id="yearlist" disabled={(this.state.yearlist === "disable") ? "disabled" : ""} onChange={this.handlerFilterValue}>
                            <option value="all">All</option>
                            {year.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

}
export class Measures extends React.Component {
    constructor(props) {
        super(props);
        this.props=props;
        this.state = {
            measure:'intensity',
            selectedMeasure:'intensity'
        };
        this.props.alertmsg.bind(this)
        this.handlerMeasure = this.handlerMeasure.bind(this);

    }
    handlerMeasure(event) {
        this.props.alertmsg(
            {
                filter:0,
                filterVal:0,
                measure:event.target.value,
                confidence:0
            }
        );
        this.setState({ measure: event.target.value });
        
      }
      
    render() {
        return (
            <Card style={{ width: '82%' }}>
                <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}
                    <Card.Subtitle className="mb-2 float-left text-muted">Measures</Card.Subtitle>
                    <Card.Text >
                        <select id="measure" onChange={this.handlerMeasure} name="measure">
                            <option   value="intensity">Intensity</option>
                            <option  value="likelihood">Likelihood</option>
                            <option  value="relevance">Relavance</option>
                        </select>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export class Confidence extends React.Component {
    constructor(props) {
        super(props);
        this.props=props;
        this.state={
            confidence:'95',
            selectedConf:'95'

        }
        this.props.alertmsg.bind(this)
        this.handlerConfidence = this.handlerConfidence.bind(this);

    }
    handlerConfidence(event) {
        this.props.alertmsg(
            {
                filter:0,
                filterVal:0,
                measure:0,
                confidence:event.target.value
            }
        );
        this.setState({ confidence: event.target.value });
    }
    render() {
        return (
            <Card style={{ width: '82%' }}>
                <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}
                    <Card.Subtitle className="mb-2 float-left text-muted">Confidence</Card.Subtitle>
                    <Card.Text className="text-left">
                        <br></br>
                        <input checked={this.state.selectedConf === '90'} onChange={this.handlerConfidence} className=" text-left" name="conf" value="90" type="radio" /><span style={{ paddingLeft: 5 }}>90%</span><br></br>
                        <input checked={this.state.selectedConf === '95'} onChange={this.handlerConfidence} className="float-left" name="conf" value="95" type="radio" /><span style={{ paddingLeft: 5 }}>95%</span><br></br>
                        <input checked={this.state.selectedConf === '99'} onChange={this.handlerConfidence} className="float-left" name="conf" value="99" type="radio" /><span style={{ paddingLeft: 5 }}>99%</span><br></br>

                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export class Swot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    render() {
        return (
            <Card style={{ width: '82%' }}>
                <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}
                    <Card.Subtitle className="mb-2 float-left text-muted">SWOT</Card.Subtitle>
                    <Card.Text >
                        <select>
                            <option value="All" defaultValue>All</option>
                            <option value="Strength">Strength</option>
                            <option value="Weakness">Weakness</option>
                            <option value="Opportunity">Opportunity</option>
                            <option value="Threat">Threat</option>
                        </select>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}



