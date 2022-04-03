import {makeStyles} from '@mui/styles';
import {Theme} from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiPaper-root': {
            background: '#fff',
            '& div.MuiToolbar-root': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                [theme.breakpoints.down('sm')]: {
                    flexWrap: 'wrap'
                }
            },
            '& input': {
                padding: '10px 100px 10px 10px',
                [theme.breakpoints.down('sm')]: {
                    padding: '10px 25px 10px 10px'
                }
            },

            '& div.MuiToggleButtonGroup-root': {
                [theme.breakpoints.down('sm')]: {
                    margin: '10px'
                }
            }
        },
        '& div.MuiGrid-item': {
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                justifyContent: 'center'
            }
        },
        '& button.toggle-btn': {
            textTransform: 'none',
            padding: '10px 25px',
            color: 'rgba(0,0,0,0.8)',
            fontSize: '1rem',
            fontWeight: '800',
            background: '#ededff',
            [theme.breakpoints.down('md')]: {
                padding: '10px'
            }
        },
        '& button.Mui-selected': {
            background: 'rgba(78, 7, 254, 1)',
            color: '#FFF',
            '&:hover': {
                backgroundColor: 'rgba(78, 7, 254, 1)',
                color: '#FFF',
            }
        },
        '& div.show-more': {
            margin: '20px 0',
            textAlign: 'center',
            '& button': {
                background: 'rgba(119, 51, 254, 0.7)',
                padding: '10px 37px',
                textTransform: 'none',
                fontSize: '1rem',
                color: '#FFF',
                fontWeight: '800',
                boxShadow: 'none',
                borderRadius: '200px'
            }
        }
    }
}));