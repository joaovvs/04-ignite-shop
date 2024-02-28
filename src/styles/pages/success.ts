import { styled } from ".."

export const SuccessContainer = styled('main', {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
    },

    div: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '2rem',
        lineHeight: 1.4,
    },

    a: {
        marginTop: '5rem',
        display: 'block',

        fontSize: 'lg',
        color: '$green500',

        textDecoration: 'none',
        fontWeight: 'bold',


        '&:hover': {
            color: '$green300'
        }
    },
})
export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 140,
    height: 140,

    background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
    borderRadius: '50%',
    padding: '0.25rem',
    marginTop: '4rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: -52,

    img: {
        objectFit: 'cover',
    },


})