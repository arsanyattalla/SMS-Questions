import { useState } from "react";
import reactLogo from "./assets/smsPic.jpg";
import insta from "./assets/insta.png";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!question) {
      alert("Please enter a question");
      return;
    }

    if (question.trim()) {
      // Ask for confirmation before submitting
      const confirmSubmit = window.confirm(`Do you want to submit the question: "${question}"?`);

      if (confirmSubmit) {
        setSubmitted(true); // Start loading
        
        try {
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxybpDflzGJsm_ZICZlvT_re-vlX40a_SPdDSOJVFZ2orNxkOozZe2sgloRuUYd7fMf/exec",
            {
              method: "POST",
              mode: "no-cors", // ✅ Prevents CORS preflight errors
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ question }),
            }
          );

          console.log(response);
          if (response) {
            setQuestion("");
            alert("Question submitted successfully");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            alert("Error submitting question");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Error submitting question");
        } finally {
          setSubmitted(false); // Reset loading state after the request is done
        }
      } else {
        // User clicked Cancel, they can edit the question
        console.log("Submission canceled. Please edit your question.");
      }
    }
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SMS Anonymous Questions</h1>
      <input
        type="text"
        placeholder="Type your question here"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="big-input"
      />
      <div>
        <button onClick={handleSubmit} disabled={submitted}>
          {submitted ? (
            <div className="loading-spinner"></div> // Spinner component
          ) : (
            "Submit"
          )}
        </button>
      </div>

      <p>Questions will be discussed/answered at the start of every meeting</p>

      <p className="read-the-docs">Pray for the service!</p>
      <div>
        <a
          href="https://www.instagram.com/sms.stantonius/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="logo-insta" src={insta} alt="Instagram" />
        </a>
      </div>
    </>
  );
}

export default App;
