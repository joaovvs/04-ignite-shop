import { styled } from ".."

export const CartContainer = styled('div', { 
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',

    width: 480,

    justifyContent: 'left',

    padding: '4.5rem 3rem 3rem',

    backgroundColor: '$gray800',

    top: 0,
    bottom: 0,
    right: 0,

    '.CloseButton': {
        marginLeft: 'auto',
        border: 'none',
        backgroundColor: 'transparent',
        color: '$gray500',
        position: 'absolute',
        top: '2.5rem',
        right: '2.5rem',
    },

    h2: {
        fontSize: '$lg',
        color: '$gray100',
        marginBottom: '2rem',
    },

    '.cartItemsWrapper': {
        display: 'flex',
        flexDirection: 'column',

        gap: '1.5rem',
    }
})


export const CartItemContainer = styled('div', { 
    display: 'flex',
    gap: '1.25rem',

    '.cartItemContent': {
        display: 'flex',
        flexDirection: 'column',

        justifyItems: 'left',
    },

    h3: {
        fontSize: '$md',  
        color: '$gray300',
        fontWeight: 'normal'
    },
    span: {
        fontSize: '$md',  
        color: '$gray100',
        fontWeight: 'bold',
    },

    button: {
        border: 'none',
        background: 'transparent',
        marginTop: 'auto',
        marginRight: 'auto',

        color: '$green500',

        fontSize: '1rem',
        fontWeight: 'bold',

        cursor: 'pointer',

        '&:hover': {
            color: '$green300',
        },
    }
})


export const CartItemImageContainer = styled('div', { 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 100,
    height: 93,
    borderRadius: 8,

    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
})


export const CartFooter = styled('footer', {
    display: 'flex',
    flexDirection: 'column',

    marginTop: 'auto',

    div: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },

    'div + div': {

        fontWeight: 'bold',
        fontSize: '$md',

        'span + span': {
            fontSize: '$xl'
        }
    },


    button: {
        border: 'none',
        borderRadius: 8,
        padding: '1.25rem 2rem',
        marginTop: '3.5625rem',

        background: '$green500',
        color: '$white',
        fontSize: '$lg',
        fontWeight: 'bold',
    }
})