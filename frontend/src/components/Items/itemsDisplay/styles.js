export const ITEM_STYLES = {
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: 4,
      bgcolor: '#d0c7b8',
      '&:hover': {
        boxShadow: 10
      }
    },
    imageContainer: {
      position: 'relative',
      paddingTop: '100%',
      backgroundColor: 'secondary.main',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    menuButton: {
      position: 'absolute',
      top: 8,
      right: 8
    },
    chip: {
      bgcolor: 'primary.lighter'
    },
    addButton: {
      px: 3,
      py: 2,
      bgcolor: 'primary.main',
      color: 'white',
      '&:hover': {
        bgcolor: 'primary.dark'
      }
    },
    tabs: {
      '& .MuiTab-root': {
        textTransform: 'none',
        minWidth: 'auto',
        px: 3,
        py: 1,
        mr: 2,
        borderRadius: 28,
        color: 'text.secondary',
        '&.Mui-selected': {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        },
      },
      '& .MuiTabs-indicator': {
        display: 'none',
      },
    }
  };