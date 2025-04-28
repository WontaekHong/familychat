// Chat.jsx - 가운데 정렬 보완 및 전체 중앙 정렬 구조 개선

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../firebase';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile || { id: 'guest', name: '손님', age: '??' };

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const chatRef = ref(db, 'messages/');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedMessages = Object.values(data).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      setMessages(loadedMessages);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const chatRef = ref(db, 'messages/');
    push(chatRef, {
      senderId: profile.id,
      senderName: profile.name,
      senderAge: profile.age,
      text: input,
      timestamp: Date.now()
    });
    setInput('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ` +
      `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleLogout = () => {
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile', { state: { profile } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6">
      <div className="w-full max-w-3xl px-4 flex flex-col items-center">
        <div className="bg-white rounded shadow p-6 mb-4 w-full">
          <h1 className="text-[30px] font-bold font-sans mb-1">FamilyChat을 접속 환영합니다.</h1>
          <p className="text-[15px] font-sans mb-1">Chat 접속을 환영합니다. 아래 채팅창에 메시지를 입력하세요</p>
          <p className="text-[10px] font-sans mb-3">{profile.id} 님 접속 中</p>
          <div className="flex gap-2">
            <button onClick={goToProfile} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">프로필 수정</button>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">로그아웃</button>
          </div>
        </div>

        <div className="bg-white shadow-inner rounded-lg p-4 h-[450px] overflow-y-auto w-full flex flex-col space-y-4">
          {messages.map((msg, idx) => {
            const isMe = msg.senderId === profile.id;
            return (
              <div
                key={idx}
                className={`max-w-[75%] rounded-xl p-4 border-2 ${
                  isMe ? 'bg-blue-50 ml-auto text-right border-black' : 'bg-white mr-auto text-left border-black'
                } shadow`}
              >
                <div className="text-sm text-gray-600 font-semibold mb-1">
                  {msg.senderName} ({msg.senderAge}세) [{msg.senderId}] - {msg.timestamp ? formatTime(msg.timestamp) : ''}
                </div>
                {msg.text && <div className="text-base text-gray-800 whitespace-pre-wrap">{msg.text}</div>}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex w-full gap-2">
          <input
            type="text"
            className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="메시지를 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-6 py-3 text-lg rounded-xl hover:bg-blue-600"
          >
            전송
          </button>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
};

export default Chat;
