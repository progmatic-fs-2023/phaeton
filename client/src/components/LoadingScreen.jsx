import CircularProgress from '@mui/joy/CircularProgress';
import './styles/LoadingScreen.css'

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <CircularProgress
        sx={{
          '--CircularProgress-size': '150px',
          '--CircularProgress-trackThickness': '20px',
          '--CircularProgress-progressThickness': '20px',
        }}
      />
    </div>
  );
}

export default LoadingScreen;
