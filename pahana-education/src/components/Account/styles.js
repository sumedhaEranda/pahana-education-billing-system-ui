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
})); 