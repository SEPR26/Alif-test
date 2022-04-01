import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    root: {
        '& .MuiPaper-root': {
            background: '#fff',
            '& div.MuiToolbar-root': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',

            },
            '& input': {
                padding: '10px 100px 10px 10px'
            }
        },

    }
});