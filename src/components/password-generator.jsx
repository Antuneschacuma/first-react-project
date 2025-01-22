import { useCallback, useEffect, useRef, useState } from 'react'

const PasswordGenerator=()=> {

  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef=useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+';
    for (let i = 1; i < lenght; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [lenght, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [lenght, numberAllowed, charAllowed]);

  const copyToClipboard=()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();

  }
  
  return (
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-8">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className=" outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
           />
        <button onClick={copyToClipboard} className="outline-none bg-blue-700 text-white py-0.5 px-3 shrink-0">copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className=' flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={lenght}
            onChange={(e) => setLenght(e.target.value)}
            className="cursor-pointer"
            id=''
            name=''
          />
          <label htmlFor="lenght">Lenght: {lenght}</label>
        </div>
        <div className=' flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            id=''
            name=''
          />
          <label htmlFor="lenght">Numbers</label>
        </div>
        <div className=' flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            id=''
            name=''
          />
          <label htmlFor="lenght">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator;


