import React, { Component } from 'react';
import Fab from '@material-ui/core';
import AddIcon from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons';
import Card, { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core';
import CardActions from '@material-ui/core';


class QueueItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notEnqueuedUser: true
        };
    };

    render() {
        const { queue } = this.props;
        const { logged } = this.state;
        return (
            <Card>
                <CardMedia
                    image="gs://queueme-ciovincri.appspot.com/logoUNICAM-full.jpg" />

                <CardContent>
                    <Typography variant="h4">
                        {queue.company}
                    </Typography>
                    <Typography variant="h3" color="textPrimary">
                        {queue.branch}
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        {queue.location}
                    </Typography>
                    <Typography variant="h6" >
                        {queue.userInTheQueue}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Fab disabled={!notEnqueuedUser}>
                        <AddIcon />
                    </Fab>
                    <Fab disabled={notEnqueuedUser} >
                        <DeleteIcon />
                    </Fab>
                </CardActions>
            </Card>

        );
    }

}