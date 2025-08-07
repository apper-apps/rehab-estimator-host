import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RehabEstimatorPage from "@/components/pages/RehabEstimatorPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <RehabEstimatorPage />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;