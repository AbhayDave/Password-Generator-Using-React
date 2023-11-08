import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [allowCharacters, setallowCharacters] = useState(false);

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowCharacters) str += `!@#$%^&*()_+-=,./<>?;':"{[}]\\\|~\``;
    if (allowNumbers) str += "1234567890";

    for (let i = 0; i < passwordLength; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass);

  }, [passwordLength, allowCharacters, allowNumbers, setPassword]);

  const copyToClipBoardHandler = useCallback(()=>{

    passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 20);
        window.navigator.clipboard.writeText(password);

  }, [password])


  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, allowCharacters, allowNumbers, passwordGenerator]);



  return (
    <div className="h-screen w-full bg-black text-white flex justify-center items-center">
      <div className="h-40  rounded-2xl w-1/2 bg-gray-800">
        <div className="flex justify-center items-center h-1/2 w-full">
          <input
            className="w-2/3 text-black h-1/2 rounded-tl-xl rounded-bl-xl"
            type="text"
            defaultValue={password}
            ref={passwordRef}
          />
          <button className="bg-blue-600 h-1/2 rounded-br-xl rounded-tr-xl text-xl px-2" onClick={copyToClipBoardHandler}>
            copy
          </button>
        </div>

        <div className="flex items-center justify-evenly h-1/2 w-full">
          <label htmlFor="len">
            <input
              className="mx-2"
              defaultValue={passwordLength}
              type="range"
              name="len"
              min={8}
              max={30}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            Length({passwordLength})
          </label>

          <label htmlFor="includeNumbers">
            <input
              className="mx-2"
              defaultChecked={allowNumbers}
              type="checkbox"
              name="includeNumbers"
              onChange={() =>
                setAllowNumbers((prev) => !prev)
              }
            />
            Numbers
          </label>

          <label htmlFor="includeCharacters">
            <input
              className="mx-2"
              defaultChecked={allowCharacters}
              type="checkbox"
              name="includeCharacters"
              onChange={() =>
                setallowCharacters((prev) => !prev)
              }
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
