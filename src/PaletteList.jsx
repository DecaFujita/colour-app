import React from 'react';
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


class PaletteList extends React.Component {
    state = {
        openDeleteDialog: false,
        deletingId:''
    }

    openDialog = id => {
        this.setState({openDeleteDialog: true, deletingId: id});
    }

    closeDialog = () => {
        this.setState({openDeleteDialog: false, deleteingId: ''});
    }

    goToPalette = (id) => (
        this.props.history.push(`/palette/${id}`)
    );

    handleDelete = (id) => {
        this.props.deletePalette(this.state.deletingId)
        this.closeDialog();
    }

    render() {
        const { palettes, classes } = this.props;
        const { openDeleteDialog } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                                <MiniPalette
                                {...palette}
                                handleClick={this.goToPalette}
                                openDialog={this.openDialog}
                                key={palette.id}
                                id={palette.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog
                    open={openDeleteDialog}
                    aria-labelledby='delete-diaglog-title'
                    onClose={this.closeDialog}
                >
                    <DialogTitle id='delete-dialog-title'>Delete this palette?</DialogTitle>
                    <ListItem button onClick={this.handleDelete}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: blue[100], color:blue[600]}}>
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Delete</ListItemText>
                    </ListItem>
                    <ListItem button onClick={this.closeDialog}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: red[100], color:red[600]}}>
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Cancel</ListItemText>
                    </ListItem>
                </Dialog>
          </div>
        )
    }
}

export default withStyles(styles)(PaletteList);