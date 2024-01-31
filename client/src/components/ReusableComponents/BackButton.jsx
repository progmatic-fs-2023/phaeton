import '../styles/ReusableComponents/BackButton.css';

function BackButton() {
  return (
    <button className="back-button" type="button" onClick={() => window.history.back()}>
      <span className="material-symbols-outlined">undo</span>
    </button>
  );
}

export default BackButton;
