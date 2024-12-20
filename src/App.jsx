import { useCallback, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [chartAllowed, setChartAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (chartAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, number, chartAllowed, setPassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-800 ">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
          value={password}
          readOnly />
          <button
            onClick={() => navigator.clipboard.writeText(password)}
            className="bg-gray-800 text-white p-2"  ></button>

        </div>
      </div>
    </>
  );
}

export default App;
