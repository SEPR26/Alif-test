import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    root: {
        '& div.post-content': {
            '& h5.card-title': {
                fontSize: '16px',
                marginBottom: '10px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                lineClamp: '1',
                display: 'box',
                wordWrap: 'break-word',
                boxOrient: 'vertical'
            },
            '& h6.card-text': {
                fontSize: '14px',
                color: 'rgba(15, 21, 48, 0.8)',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                lineClamp: '4',
                display: 'box',
                wordWrap: 'break-word',
                boxOrient: 'vertical'
            }
        }
    }
});