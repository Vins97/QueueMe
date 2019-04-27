import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';



import QmeIcon from '@material-ui/icons/PlayForWork';
import UnQmeIcon from '@material-ui/icons/HighlightOff'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class QCard extends React.Component {
  constructor(props) {
    super(props);
     this.state = { expanded: false,
            number: 0,
            avatartxt: "Q",
            titletxt: "Queue 1",
            description : "This is the queue for the place name ,Briefly description" ,
            image: " img"
        
        
        };
      }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Queue" className={classes.avatar}>
              {this.state.avatartxt}
            </Avatar>
          }
          action={
            this.state.number
          }
          title= {this.state.titletxt}
          subheader="Data"
        />
        <CardMedia
          className={classes.media}
          image={this.state.image}
          title=""
        />
        <CardContent>
          <Typography component="p">
         { this.state.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add me to this queue">
            <QmeIcon />
          </IconButton>
          <IconButton aria-label="Add to favourite">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Unqueue me to this queue" >
            <UnQmeIcon />
          </IconButton>

        </CardActions>
        
      </Card>
    );
  }
}

QCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QCard);