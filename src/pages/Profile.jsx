// Profile.jsx - Firebase 연동 (서버 저장/불러오기)

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { db } from '../firebase';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginId = location.state?.profile?.id || 'guest';

  const [profile, setProfile] = useState({
    id: loginId,
    name: '홍길동',
    age: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const profileRef = ref(db, `profiles/${loginId}`);
      const snapshot = await get(profileRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setProfile({ id: loginId, name: data.name || '홍길동', age: data.age || '' });
      }
    };
    fetchProfile();
  }, [loginId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!profile.name || !profile.age) {
      alert('이름과 나이를 입력해주세요');
      return;
    }
    const profileRef = ref(db, `profiles/${profile.id}`);
    await set(profileRef, { name: profile.name, age: profile.age });
    navigate('/chat', { state: { profile } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">프로필 설정</h1>

        <label className="block mb-2 font-medium">ID (수정 불가)</label>
        <input
          name="id"
          value={profile.id}
          readOnly
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 bg-gray-100 text-gray-500 cursor-not-allowed"
        />

        <label className="block mb-2 font-medium">이름</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="예: 홍길동"
        />

        <label className="block mb-2 font-medium">나이</label>
        <input
          name="age"
          value={profile.age}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
          placeholder="예: 30"
        />

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          저장하고 채팅 시작하기
        </button>
      </div>
    </div>
  );
};

export default Profile;