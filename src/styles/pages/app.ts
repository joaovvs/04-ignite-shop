import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',


})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    button: {
        padding: '0.75rem',

        border: 'none',
        borderRadius: 6,
        position: 'relative',
        background: '$gray800',
        color: "$gray500",

        cursor: 'pointer',
        span: {
            width: '1.5rem',
            height: '1.5rem',
            border: '3px solid $gray900',
            background: '$green500',
            borderRadius: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            

            position: 'absolute',
            top: -7,
            right: -7,

            fontSize: 'sm',
            fontWeight: 'bold',
            color: '$white',
        }
    },
})

