import { useState, useEffect, useRef, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { debounce } from 'lodash';
import styles from './MyEditor.module.css';
// import './MyEditor.css';
import Swal from 'sweetalert2';
import { api, tinymce } from '../../../config/config'
import { ChatsContext } from '../../../context/ChatsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useCheckList } from '../../../store/store';
const MyEditor = ({ editorRef, height }) => {

  const [content, setContent] = useState('');
  const { ws } = useContext(ChatsContext);
  const inputRef = useRef(null);
  const {chatSeq}= useCheckList();

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

  
    api.post(`/chatUpload?group_seq=${chatSeq}`, formData).then(resp => { //파일 로직 처리
      const array = resp.data;
      // for (let index = 0; index < array.length; index++) {
      //   const jsonString = JSON.stringify(array[index]);
      //   ws.current.send(jsonString);
      //   inputRef.current.value = '';
      // }
      for (let index = 0; index < array.length; index++) {
        const imageUrl = `<img src="${array[index]}" alt="uploaded image" />`;
        const prevContent= editorRef.current.getContent();
        editorRef.current.setContent(prevContent+imageUrl);
      }
    
      inputRef.current.value = '';

    }).catch(error => {
      console.error('There was an error posting the data!', error);
    });
  }




  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    setContent(savedContent || '');
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.file}>
        <FontAwesomeIcon icon={faCamera} className={styles.icon} onClick={handleUpload} />
      </div>
      <div className={styles.editor}>
        <Editor
          initialValue={content}
          apiKey={tinymce}
          onEditorChange={(content) => handleEditorChange(content)}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          init={{
            width: "auto",
            height: '40px',
            menubar: false,
            plugins: 'wordcount anchor code', //image
            toolbar: false,
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
                text: '',
                onSetup: (e) => {


                },
                onAction: (e) => {
               
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
                      } else {
                        const { chatSeq } = useCheckList.getState();
                        const data={chatSeq:chatSeq,message:editorRef.current.getContent()};
                        const jsonString = JSON.stringify(data);
                        ws.current.send(jsonString);
                      }

                    }
                    editorRef.current.setContent('');
                  }
                }
              });
            }
          }}

        />
      </div>
      <div className={styles.hidden}>
        <input type="file" className={styles.upload} name='files' ref={inputRef} onChange={handleOnchange} multiple />
      </div>
    </div>);
};

export default MyEditor;