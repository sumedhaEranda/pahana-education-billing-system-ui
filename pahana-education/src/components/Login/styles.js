import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: '16px',
      padding: '0',
    },
  },
  dialogTitle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '24px 24px 16px 24px',
    '& .MuiTypography-h5': {
      fontWeight: 600,
    },
  },
  closeButton: {
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  dialogContent: {
    padding: '24px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#667eea',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#667eea',
      },
    },
  },
  forgotPassword: {
    '& .MuiButton-root': {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  dialogActions: {
    padding: '16px 0 0 0',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '16px',
    padding: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    },
  },
  socialButton: {
    borderColor: '#e0e0e0',
    color: '#333',
    textTransform: 'none',
    fontWeight: 500,
    marginBottom: '12px',
    borderRadius: '8px',
    padding: '12px',
    '&:hover': {
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.04)',
    },
  },
  toggleButton: {
    textTransform: 'none',
    fontWeight: 600,
    padding: '0',
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  },
})); 