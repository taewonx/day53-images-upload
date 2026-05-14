import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // 1. 선택한 파일을 담아둘 '장바구니' 상태를 만듭니다.
  const [file, setFile] = useState(null);

  // 2. 사용자가 파일을 선택했을 때 실행되는 함수입니다.
  const handleFileChange = (e) => {
    // e.target.files[0]은 사용자가 선택한 첫 번째 파일을 의미합니다.
    setFile(e.target.files[0]);
  };

  // 3. '서버로 보내기' 버튼을 눌렀을 때 실행되는 함수입니다.
  const handleUpload = async () => {
    if (!file) {
      alert("먼저 사진을 골라주세요!");
      return;
    }

    // [중요] 이미지는 텍스트가 아니므로 FormData라는 특수 바구니에 담아야 합니다.
    const formData = new FormData();
    formData.append('image', file); // 'image'라는 이름은 서버의 설정과 같아야 합니다.

    try {
      // axios를 이용해 서버의 /upload 주소로 바구니를 던집니다.
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // "이건 파일이에요"라고 알려주는 표지판
        }
      });
      
      alert("성공: " + response.data.message);
    } catch (error) {
      console.error(error);
      alert("업로드에 실패했습니다.");
    }
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>🖼️ 이미지 업로드 서비스</h2>
      
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      <br /><br />
      
      
      {file && <p>선택된 파일: {file.name}</p>}

      
      <button onClick={handleUpload} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        서버로 전송하기
      </button>
    </div>
  );
}

export default App;