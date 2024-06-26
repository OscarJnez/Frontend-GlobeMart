import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFFFFF'
            // main: '#6E665F',
            // fixed: '#74F8E5',
            // fixedVariant: '#005048'
        },
        secondary: {
            main: '#FC944E',
            // fixedDim: '#FABD00',
            // fixedVariant: '#5B4300'
        },
        warning: {
            main: '#FF6000',
            onContainer: '#001E31'
        },
        background: {
            default: '#010409',
            brigther: '#1E1E1E',
            brigther: '#353535',
            superBright: '#4C4C4C'
            // default: '#F0EDE5'
            // default: '#E7E7E7'
            // brigth: '#F9F9F9'

        },
        borders: {
            default: '1px solid #E7E7E7',
            // default: '#F0EDE5'
            // default: '#E7E7E7'
            brigth: '#F9F9F9'
        },
        text: {
            primary: '#FFFFFF',
        },

    },

    typography: {
        h3: {
            fontSize: '3rem',
            fontWeight: 400,
            letterSpacing: '0.0em',
        },
        h4: {
            fontSize: '2.125rem',
            fontWeight: 400,
            letterSpacing: '0.025em',
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 400,
            letterSpacing: '0.0em',
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 200, // Peso medio para más prominencia, similar al de los Tabs
            letterSpacing: '0.015em',
            // textTransform: 'uppercase',
        },
        tab: {
            fontSize: '0.90rem',
            fontWeight: 400,
            letterSpacing: '0.015em',
            textTransform: 'uppercase', // Los tabs suelen tener texto en mayúscula

        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 400,
            letterSpacing: '0.015em',
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.01em',
        },
        subtitleRef: {
            fontSize: '0.90rem',
            fontWeight: 400, // Peso medio para más prominencia, similar al de los Tabs
            letterSpacing: '0.015em',

        },

    },

    components: {

        // Aqui vamos a modificar las propiededes del boton de MUI.
        MuiButton: {
            styleOverrides: {

                root: {
                    // fontWeight: 'bold'
                },
                containedPrimary: {
                    backgroundColor: '#6E665F',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#5a524c'
                    },
                    '&.Mui-disabled': { // Selector de estado para 'disabled'

                        backgroundColor: '#010409',
                        color: '#ffffff',
                    },
                    // '&:active': {   // Selector de estado para cuando clicamos el boton.
                    //     backgroundColor: '#c68215', // Un color más oscuro o cualquier estilo que desees al hacer clic
                    // },
                },
                containedSecondary: {
                    backgroundColor: '#F9AB19',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#d89416', // Un poco más oscuro al pasar el mouse
                    },
                    '&.Mui-disabled': { // Selector de estado para 'disabled'
                        backgroundColor: '#010409',
                        color: '#ffffff',
                    },
                },
                containedSuccess: {
                    backgroundColor: '#218838',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#1B5E20', // Un poco más oscuro al pasar el mouse
                    },
                    '&.Mui-disabled': { // Selector de estado para 'disabled'
                        backgroundColor: '#010409',
                        color: '#ffffff',
                        // textTransform: 'lowercase'
                    },
                },
                containedWarning: {
                    backgroundColor: '#FF6000',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#B71C1C',
                    },
                    '&.Mui-disabled': { // Selector de estado para 'disabled'
                        backgroundColor: '#010409',
                        color: '#ffffff',
                    },

                },
                outlinedPrimary: {
                    color: '#6E665F',
                    '&:hover': {
                        borderColor: '#F9AB19'
                    },
                    border: '1px solid #6E665F',
                    borderColor: '#6E665F',
                    '&.Mui-disabled': { // Selector de estado para 'disabled'
                        backgroundColor: '#010409',
                        color: '#ffffff ',

                    },
                },
                outlinedSecondary: {
                    color: '#F9AB19',
                    '&:hover': {
                        borderColor: '#FFFFFF'
                    },
                    border: '1px solid #6E665F',
                    borderColor: '#FFFFFF',
                    '&.Mui-disabled': { // Selector de estado para 'disabled'
                        backgroundColor: '#010409',
                        color: '#ffffff ',
                    },
                },
                outlinedWarning: {
                    color: '#FF6000',
                    '&:hover': {
                        borderColor: '#FF6000'
                    },
                    border: '1px solid #6E665F',
                    borderColor: '#F9AB19',
                    '&.Mui-disabled': { // Selector de estado para 'disabled'
                        backgroundColor: '#010409',
                        color: '#ffffff ',

                    },
                }
            }
        }
    }

});


