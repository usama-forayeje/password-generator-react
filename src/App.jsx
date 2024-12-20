import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  // State variables to manage password options
  const [length, setLength] = useState(8); // Length of the password
  const [number, setNumber] = useState(false); // Include numbers or not
  const [chartAllowed, setChartAllowed] = useState(false); // Include special characters or not
  const [password, setPassword] = useState(""); // Generated password
  const passwordRef = useRef(null);

  // Function to generate the password based on selected options
  const passwordGenerator = useCallback(() => {
    let pass = ""; // Initialize empty password string
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz"; // Base characters

    // Add numbers if selected
    if (number) str += "0123456789";

    // Add special characters if selected
    if (chartAllowed) str += "!@#$%^&*()_+";

    // Generate password of the specified length
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass); // Update the password state
  }, [length, number, chartAllowed]);

  // Automatically generate password when options change
  useEffect(() => {
    passwordGenerator();
  }, [length, number, chartAllowed, passwordGenerator]);

  // Function to copy the generated password to clipboard
  const handleCopy = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 9999); // Select the password text
      navigator.clipboard.writeText(passwordRef.current.value);
      alert("Password copied to clipboard!"); // Show alert
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-sans">
      {/* Main container */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl text-gray-800">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-4">Password Generator</h1>

        {/* Password display and copy button */}
        <div className="mb-4">
          <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 shadow">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="w-full bg-transparent outline-none px-2 text-gray-700"
              placeholder="Your password will appear here"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-1 ml-2 transition-transform transform hover:scale-105"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Options for password customization in one row */}
        <div className="flex items-center justify-between gap-4">
          {/* Password length slider */}
          <div className="flex items-center space-x-2">
            <label htmlFor="length" className="text-sm font-semibold">Length: {length}</label>
            <input
              id="length"
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))}
              className="w-32"
            />
          </div>

          {/* Include numbers checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber((prev) => !prev)}
              className=""
            />
            <label className="text-sm font-semibold">Numbers</label>
          </div>

          {/* Include special characters checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={chartAllowed}
              onChange={() => setChartAllowed((prev) => !prev)}
              className=""
            />
            <label className="text-sm font-semibold">Special Characters</label>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-sm text-gray-200">
        Made with <span className="text-red-500">&hearts;</span> by Usama Forayaje
      </footer>
    </div>
  );
}

export default App;
