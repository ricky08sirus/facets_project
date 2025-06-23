import React, { useState } from 'react';

export default function Password() {
  const [passLength, setPassLength] = useState('');
  const [genPswd, setGenPswd] = useState('');
  const [inclAlp, setInclAlp] = useState(true);
  const [inclNum, setInclNum] = useState(false);
  const [inclSyml, setInclSyml] = useState(false);
  const [error, setError] = useState('');


  const genPass = () => {
    const pass_len = parseInt(passLength);
    if (isNaN(pass_len) || pass_len <= 0) {
      setGenPswd('Please Enter a Valid Length');
      return;
    }

    let letters = '';
    if (inclAlp) letters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (inclNum) letters += '0123456789';
    if (inclSyml) letters += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (letters.length === 0) {
      setGenPswd('Please select at least one character set');
      return;
    }
    setError('');

    let pass = '';
    for (let i = 0; i < pass_len; i++) {
      pass += letters[Math.floor(Math.random() * letters.length)];
    }

    setGenPswd(pass);
    console.log('Generated password:', pass);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="p-[2px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">

        <div className="bg-white rounded-xl p-8 w-full max-w-lg">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Password Generator
          </h1>

          <label htmlFor="length" className="block text-gray-700 text-sm font-medium mb-2">
            Password Length
          </label>
          <input
            id="length"
            type="number"
            placeholder="Enter length"
            value={passLength}
            onChange={(e) => setPassLength(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />

          <div className="mb-6 space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={inclAlp}
                onChange={() => setInclAlp(!inclAlp)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-800">Include Alphabets (a-z, A-Z)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={inclNum}
                onChange={() => setInclNum(!inclNum)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-800">Include Numbers (0-9)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={inclSyml}
                onChange={() => setInclSyml(!inclSyml)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-800">Include Symbols (!@#$...)</span>
            </label>
          </div>

          <button
            onClick={genPass}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded w-full font-semibold transition duration-150"
          >
            Generate Password
          </button>
          {error && <div role="alert">{error}</div>}

          {genPswd && (

            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded text-green-300 font-mono break-words select-all shadow" data-testid="password-output">
              {genPswd}
            </div>
          )}
        </div>
      </div>
    </div>
  );

}

