import { styled } from "..";

export const HomeContainer = styled('main', {
    display: 'flex',
    width: '100%',
    maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
    marginLeft: 'auto',
    minHeight: 656,

    position: 'relative',

    '.arrow': {
        width: '30px',
        height: '30px',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        '-webkit-transform': 'translateY(-50%)',
        fill: '$white',
        cursor: 'pointer',
      },
      
      '.arrow--left': {
        left: '5px',
      },
      
      '.arrow--right': {
        left: 'auto',
        right: '5px',
      },
      
      '.arrow--disabled': {
       display: 'none',
      }
})


export const ProductHomeContainer = styled('div', {
    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '2rem',

        
        borderRadius: 6,


        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'rgba( 0 , 0 , 0, 0.6)',

        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        div: {

            display: 'flex',
            flexDirection: 'column',

            strong: {
                fontSize: '$lg',
                color: '$gray100',
                lineHeight: 1.6,
            },
    
            span: {
                fontSize: '$xl',
                fontWeight: 'bold',
                color: '$green300',
                lineHeight: 1.4,
            },

        },

        button: {
            border: 'none',
            borderRadius: 6,
            padding: '0.75rem',
            background: '$green500',
            color: '$white',
            
            lineHeight: 0,
            cursor: 'pointer',

            '&:hover': {
                background: '$green300',
            }
        }
   

    },

    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
        }
    }
})