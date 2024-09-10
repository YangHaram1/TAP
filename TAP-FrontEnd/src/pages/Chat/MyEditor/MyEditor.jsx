import { useState, useEffect, useRef, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { debounce } from 'lodash';
import styles from './MyEditor.module.css';
// import './MyEditor.css';
import  Swal  from 'sweetalert2';
import { api,tinymce } from '../../../config/config'
import { ChatsContext } from '../../../context/ChatsContext';

const MyEditor = ({ editorRef, height }) => {

  const [content, setContent] = useState('');
  const {ws}=useContext(ChatsContext);
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
    const savedContent = localStorage.getItem('editorContent');
    setContent(savedContent || '');
  }, []);


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
          height: height || "auto",
          menubar: false,
          plugins: 'wordcount anchor code', //image
          toolbar: 'fileupload| forecolor backcolor  blocks fontfamily fontsize fontcolor | bold italic underline strikethrough | link image media table mergetags  | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ',
          language: 'ko_KR',
          statusbar: false,
          file_picker_types: 'file image media',
          file_picker_callback: (callback, value, meta) => { },
          setup: (editor) => {
            editor.on('PastePreProcess ', (e) => {
              // 임시 div 요소에 붙여넣기된 콘텐츠를 삽입
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = e.content;
              // 이미지 태그가 있는지 검사
              const images = tempDiv.getElementsByTagName('img');
              if (images.length > 0) {
                e.preventDefault(); // 이미지가 포함된 붙여넣기를 막음
              } else {
                // 이미지가 없다면 다른 콘텐츠는 허용
                e.content = tempDiv.innerHTML;
              }
            });
            editor.on('PastePostProcess', (e) => {
              // 붙여넣기 후에 처리할 로직을 여기에 추가
              console.log('After Paste:', e.node.innerHTML);
            });
            editor.ui.registry.addButton('fileupload', {
              text: '📁',
              onSetup: (e) => {
              },
              onAction: (e) => {
                handleUpload();
              },
            });
            editor.on('keydown', (event) => {
              if (event.key === 'Enter') {
                if (!event.shiftKey) {
                  event.preventDefault(); // 기본 Enter 키 동작을 막음
                  if (editorRef.current.getContent() !== '') {
                    if (editorRef.current.getContent().length > 1500) {
                      Swal.fire({
                        icon: 'error',
                        title: "채팅",
                        text: '내용이 너무 깁니다.'
                      })
                    }else{
                        ws.current.send(editorRef.current.getContent());
                    }
                 
                  }
                  editorRef.current.setContent('');
                }
              }
            });
          }
        }}

      />
      <div className={styles.hidden}>
        <input type="file" className={styles.upload} name='files' ref={inputRef} onChange={handleOnchange} multiple />
      </div>


    </div>);
};

export default MyEditor;