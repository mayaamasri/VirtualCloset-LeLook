export const ITEM_STYLES = {
    mainContainer: {
      maxWidth: 600,
      mx: 'auto',
      mt: 8,
      p: 3
    },
    title: {
      fontFamily: 'Playfair Display',
      fontStyle: 'italic',
      color: 'primary.main',
      mb: 4,
      textAlign: 'center'
    },
    stepper: {
      mb: 4
    },
    chipContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      mt: 4,
      gap: 2
    },
    button: {
      borderRadius: 28,
      px: 4
    },
    submitButton: {
      bgcolor: 'primary.main',
      color: 'white',
      '&:hover': {
        bgcolor: 'primary.dark'
      }
    }
  };
  