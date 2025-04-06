import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto", // Center the loader
};

type ThrobberProps = {
  loading: boolean; // Define the loading prop
};

function Throbber({ loading }: ThrobberProps) {
  console.log("Throbber loading:", loading); // Debug log

  return (
    <div className="sweet-loading">
      {loading && (
        <ClipLoader
          color="grey" // Set the spinner color
          loading={loading}
          size={25} // Set the size of the spinner
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
}

export default Throbber;