// BizNoticeEditor.js
import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터의 기본 스타일
import styles from './BizNoticeEditor.module.css'; // CSS 모듈 파일 임포트
import '../../App.css';

const BizNoticeEditor = ({ value, onChange }) => {
  // 기본적인 상태 관리 및 에디터 옵션 설정
  const [editorContent, setEditorContent] = useState(value || '');
  const quillRef = useRef(null); // ref 추가

  const handleEditorChange = (content) => {
    setEditorContent(content);
    if (onChange) {
      onChange(content);
    }
  };

  // Quill 에디터의 모듈과 포맷 설정
  const modules = {
    toolbar: [
    //   [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
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
  ];

  return (
    <div className={styles.qlContainer}>
    <ReactQuill
      ref={quillRef}  // ref 적용
      value={editorContent}
      onChange={handleEditorChange}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="공지안내글을 문자로만 작성하세요."
      className={styles.qlEditor} // CSS 모듈 클래스 적용
    />
  </div>
  );
};

export default BizNoticeEditor;
