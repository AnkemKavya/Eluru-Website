import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">

      <div className="he-loader">

        <div className="loader-ring"></div>

        <div className="loader-center">

          <div className="he-logo">
            <span className="h">H</span>
            <span className="e">E</span>

            <div className="leaf">
              🍃
            </div>

          </div>

        </div>

      </div>

      <div className="loading-text">
        Loading Healthy Eluru...
      </div>

      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  );
}