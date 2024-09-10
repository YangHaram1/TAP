import { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { debounce } from 'lodash';
import styles from './MyEditor.module.css';
// import './MyEditor.css';
import  Swal  from 'sweetalert2';
import { api,tinymce } from '../../config/config';

const MyEditorOnlyText = ({ editorRef }) => {

  const [content, setContent] = useState('');
  const inputRef = useRef(null);

  const handleEditorChange = debounce((content) => {
    localStorage.setItem('editorContent', content);
  }, 300);

  const handleUpload = () => {
    inputRef.current.click();
  }
  const handleOnchange = () => {
    const files = inputRef.current.files;
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append("files", files[index]);
    }

  }

  useEffect(() => {
    if (editorRef) {
        editorRef.current = inputRef.current;
      }
    }, [editorRef]);


  return (
    <div className={styles.container}>
      <Editor
        initialValue={content}
        apiKey={tinymce}
        onEditorChange={(content) => handleEditorChange(content)}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          width: "auto",
          height: "300px",
          menubar: false, // 메뉴바 숨기기
          plugins: 'colorpicker textcolor advlist autolink lists link image charmap print preview anchor help searchreplace visualblocks code fullscreen insertdatetime media table paste code', // 필요한 플러그인들 추가
          toolbar: 'undo redo | formatselect | bold italic underline strikethrough | forecolor  | alignleft aligncenter alignright alignjustify | outdent indent | removeformat', // 필요한 툴바 버튼들 추가
         
          language: 'ko_KR',
          statusbar: false,
          setup: (editor) => {
            editor.ui.registry.addButton('fileupload', {
              text: '📁',
              onSetup: (e) => {},
              onAction: (e) => {
                handleUpload();
              },
            });
         
          }
        }}
      />
      <div className={styles.hidden}>
        <input type="file" className={styles.upload} name='files' ref={inputRef} onChange={handleOnchange} multiple />
      </div>
    </div>
  );
};

export default MyEditorOnlyText;