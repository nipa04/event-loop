import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import EventsMapView from './EventsMapView';



class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      error: null,
      isLoaded: false,
      event: {
        id: undefined,
        title: undefined,
        description: undefined,
        address: undefined,
        city: undefined,
        start_date: undefined,
        end_date: undefined,
        venue: undefined,
        image_url: undefined,
      }
    };
  }

  componentDidMount() {
    this.fetchDetails(this.props.match.params.id);

  }

  fetchDetails(id) {
    fetch('http://127.0.0.1:8000/api/events/' + id + "/")
    .then(response => response.json())
    .then( data => this.setState({
          event: {
            id: data.id,
            title: data.title,
            description: data.description,
            address: data.location.address,
            city: data.location.city,
            date: data.date,
            start_time: data.start_time,
            end_time: data.end_time,
            venue: data.venue_name,
            image_url: data.image_url,
            eventLocations: [{ lat: parseFloat(data.location.latitude), lng: parseFloat(data.location.longitude)}],
          },
          isLoading: false,
        })
    )
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    console.log(this.state.event);
    console.log(this.state.eventLocations);
    const EventRender = (props) => {
    return(
        <div>
            { props.id ? (

              <Card style={{width: '50%', 'padding-left': '25%' }}>

                <CardMedia
                  component="img"
                  height="360"     // as an example I am modifying width and height
                  width="640"
                  style={{background: 'cover'}}

                  image={props.image_url}
                />
                   <CardContent>
                     <Typography variant="title" color="textPrimary">

                       <b>{props.title}</b>

                     </Typography>

                     <Typography variant="subtitle1" color="primary">
                       <b>Date</b> : {props.date}
                     </Typography>

                     <Typography variant="subtitle1" color="primary">
                       <b>Start Time</b> : {props.start_time}
                     </Typography>

                     <Typography variant="subtitle1" color="primary">
                       <b>End Time: </b>{props.end_time}
                     </Typography>

                     <Typography variant="subtitle1" color="textPrimary">
                       <b>Address</b>: {props.address + "," + props.city}
                     </Typography>

                     <Typography variant="subtitle1" color="textPrimary">
                       <b>Venue :</b> {props.venue}
                     </Typography>

                      <Typography component="p" color="textPrimary">

                        <b>Description</b>: <i>{props.description}</i>
                      </Typography>

                    </CardContent>
                    <EventsMapView eventLocations={props.eventLocations} />


                </Card>
            ) : null}
        </div>
    )
}
    return EventRender(this.state.event);
  }
}

export default EventDetails;
