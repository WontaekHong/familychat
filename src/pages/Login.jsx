// Login.jsx - 자동완성 방지 속성 추가

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validUsers = [
    { id: 'master', password: 'maseter' },
    { id: 'hhw', password: 'hhw' },
    { id: 'lhw', password: 'lhw' },
    { id: 'jgr', password: 'jgr' },
    { id: 'hsj', password: 'hsj' },
    { id: 'hwt', password: 'hwt' },
  ];

  const handleLogin = () => {
    const user = validUsers.find((u) => u.id === id && u.password === password);
    if (user) {
      navigate('/chat', { state: { profile: { id: user.id, name: '홍길동', age: '?' } } });
    } else {
      setError('ID 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 antialiased">
  <div className="bg-white p-10 rounded-2xl shadow-lg w-80 flex flex-col items-center">
    <h2 className="text-3xl font-bold mb-6 text-blue-700">로그인</h2>
    <input
      type="text"
      placeholder="ID 입력창"
      autoComplete="off"
      value={id}
      onChange={(e) => setId(e.target.value)}
      className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="password"
      placeholder="PW 입력창"
      autoComplete="new-password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    <button
      onClick={handleLogin}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
    >
      로그인
    </button>
  </div>
</div>

  );
};

export default Login;