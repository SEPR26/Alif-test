import React, {FC, forwardRef, useState} from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    DialogContent, DialogContentText,
    DialogTitle,
    Modal, Slide,
    Typography
} from '@mui/material';
import {postsApi} from '../../api/api';
import {useStyles} from './useStyles';
import {TransitionProps} from '@mui/material/transitions';

type CustomCard = {
    post: any
}

export const CustomCard: FC<CustomCard> = ({post}) => {
    const [open, setOpen] = React.useState(false);

    const {id, title, body} = post;

    const photoUrl = postsApi.endpoints.photosById.useQuery(id).data?.thumbnailUrl;
    ;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card sx={{width: 250}} onClick={handleClickOpen}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150"
                        image={photoUrl}
                        alt="alif-tech"
                    />
                    <CardContent sx={{height: 150}}>
                        <div className="post-content">
                            <Typography variant="h5" color="text.secondary" className="card-title">
                                Title: {title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" className="card-text">
                                Description: {body}
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    TITLE: {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Description: {body}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};
