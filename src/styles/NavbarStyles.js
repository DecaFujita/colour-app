export default {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black',
        }
    },  
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slide-rail': {
            height: '8px'
        },
        '& .rc-slider-handle,.rc-slider-handle:active, .rc-slider-handle:focus,.rc-slider-handle:hover': {
            backgroundColor: 'green',
            outline: 'nonegreen',
            border: '2px solid green',
            boxShadow: 'nonegreen',
            width: '13pxgreen',
            height: '13pxgreen',
            marginLeft: '-7pxgreen',
            marginTop: '-3pxgreen',
        },
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem'
    } 
}
