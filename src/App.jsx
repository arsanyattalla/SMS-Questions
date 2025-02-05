import { useState, useEffect } from "react";
import reactLogo from "./assets/smsPic.jpg";
import insta from "./assets/insta.png";
import "./App.css";
import emailjs from "@emailjs/browser";

function App() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!question) {
      alert("Please enter a question");
      return;
    }
    const templateParams = {
      question: question, 
    };

    if (question.trim()) {
      const confirmSubmit = window.confirm(`Do you want to submit the question: "${question}"?`);

      if (confirmSubmit) {
        setSubmitted(true); 
        
        try {
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxybpDflzGJsm_ZICZlvT_re-vlX40a_SPdDSOJVFZ2orNxkOozZe2sgloRuUYd7fMf/exec",
            {
              method: "POST",
              mode: "no-cors", 
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ question }),
            }
          );

          if (response) {
            emailjs
            .send("service_obnu2he", "template_4bhm2h7", templateParams, "80LgiH9fzBUcberZT")
            .then((response) => {
              console.log("Email sent successfully!", response);
            })
           
        };
            setQuestion("");
            alert("Question submitted successfully");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        } catch (error) {
          console.error("Error:", error);
          alert("Error submitting question");
        } finally {
          setSubmitted(false); 
        }
      } else {
        console.log("Submission canceled.");
      }
    }
    
    
     
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <>
      <div>
        <a>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
       
      </div>
      <h1>SMS Anonymous Questions</h1>
      <input
        type="text"
        placeholder="What's your question?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="big-input"
        onKeyDown={handleKeyDown}
      />
      <div>
        <button onClick={handleSubmit} disabled={submitted}>
          {submitted ? (
            <div className="loading-spinner"></div> 
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
