// BizNoticeEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터의 기본 스타일
import styles from './BizDescription.module.css' // CSS 모듈 파일 임포트

const BizDescription = ({ value, onChange }) => {
  // 기본적인 상태 관리 및 에디터 옵션 설정
  const [editorContent, setEditorContent] = useState(value || '');

  const handleEditorChange = (content) => {
    setEditorContent(content);
    if (onChange) {
      onChange(content);
    }
  };

  // Quill 에디터의 모듈과 포맷 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [ 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    
    'image',
  ];

  return (
    <div className={styles.qlContainer}>
    <ReactQuill
      value={editorContent}
      onChange={handleEditorChange}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="상세 정보에 대해 이미지 입력 및 텍스트를 작성하세요. "
      className={styles.qlEditor} // CSS 모듈 클래스 적용
    />
  </div>
  );
};

export default BizDescription;
