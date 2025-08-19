import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 600,
    color: '#2c3e50',
  },
  profileCard: {
    height: 'fit-content',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    width: 100,
    height: 100,
    fontSize: 40,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    border: '4px solid rgba(255, 255, 255, 0.3)',
  },
  userName: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  detailsCard: {
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  actionsCard: {
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  fieldIcon: {
    fontSize: 20,
    color: theme.palette.primary.main,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  // New styles for order history
  section: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
  orderCard: {
    height: '100%',
    display: 'flex',
    borderRadius: 12,
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  orderImage: {
    height: 140,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f5f7fa',
  },
  // Additional styles for better spacing
  cardContent: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
  statusChip: {
    fontWeight: 600,
    borderRadius: 4,
  },
  viewDetailsButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 8,
  },
}));