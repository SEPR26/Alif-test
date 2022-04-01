import React, {FC} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {postsApi} from '../../api/api';
import {useStyles} from './useStyles';

type CustomCard = {
    post: any
}

export const CustomCard: FC<CustomCard> = ({post}) => {

    const {id, title} = post;

    const photoUrl = postsApi.endpoints.photosById.useQuery(id).data?.thumbnailUrl;

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Card sx={{width: 250}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="150"
                        image={photoUrl}
                        alt="alif-tech"
                    />
                    <CardContent className="user-content" sx={{height: 150}}>
                        <div className="user-name">
                            <Typography variant="h6" color="text.secondary">
                                {title}
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};
