import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from './MyEditor.module.css';
import Swal from 'sweetalert2';
import { api, tinymce } from '../../config/config';

const MyEditorOnlyAdmin = ({ editorRef, height, subCategoryName, onContentChange }) => {
  const [content, setContent] = useState('');
  const inputRef = useRef(null);

  // Text and content update handler
  const handleEditorChange = (content) => {
    setContent(content);
    if (onContentChange) {
      onContentChange(content);
    }
  };

  // Image upload handler
  const handleUpload = () => {
    inputRef.current.click();
  };

  // Handle image insertion from the input
  const handleOnchange = () => {
    const files = inputRef.current.files;
    const formData = new FormData();

    for (let index = 0; index < files.length; index++) {
      formData.append("files", files[index]);
    }

    api.post(`/bizUpload?group_seq=0`, formData)
      .then(resp => {
        const array = resp.data;
        array.forEach((imageUrl) => {
          const imageTag = `<img src="${imageUrl}" alt="uploaded image" style="width: 100%; height: auto;"/>`;
          const prevContent = editorRef.current.getContent();
          editorRef.current.setContent(prevContent + imageTag);
        });
        inputRef.current.value = ''; // Clear the input
      })
      .catch(error => {
        console.error('There was an error posting the data!', error);
      });
  };

  // Handle image upload from pasted content
  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file); // FormData에 파일 추가
      const response = await api.post(`/bizUpload?group_seq=0`, formData);
      const imageUrl = response.data[0]; // 서버에서 반환된 이미지 URL
      const imageTag = `<img src="${imageUrl}" alt="uploaded image" style="width: 100%; height: auto;"/>`;
      const prevContent = editorRef.current.getContent();
      editorRef.current.setContent(prevContent + imageTag);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Editor
        apiKey={tinymce}
        value={content}
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          height: height,
          menubar: false,
          plugins: 'wordcount anchor code image',
          toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | image',
          language: 'ko_KR',
          statusbar: false,
          forced_root_block: 'p',  // 줄바꿈을 p 태그로 처리
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === 'image') {
              handleUpload();
            }
          },
          setup: (editor) => {
            editor.on('PastePreProcess', (e) => {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = e.content;
              const images = tempDiv.getElementsByTagName('img');
              
              if (images.length > 0) {
                e.preventDefault(); // 기본 붙여넣기 중단
                const getBlobFromBlobUrl = async (blobUrl) => {
                  const response = await fetch(blobUrl);
                  return await response.blob();
                };
                getBlobFromBlobUrl(images[0].src).then(blob => {
                  const file = new File([blob], 'uploaded_image.jpg', { type: blob.type });
                  handleImageUpload(file); // 이미지 업로드 함수 호출
                });
              } else {
                e.content = tempDiv.innerHTML;  // 이미지가 없는 경우 콘텐츠를 그대로 허용
              }
            });

            // **엔터 키 관련 동작 제거** - 기본 TinyMCE 줄바꿈 동작을 따르게 함
            editor.on('keydown', (event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                // 더 이상 preventDefault 호출하지 않음 -> 기본 줄바꿈 동작 유지
              }
            });
          },
        }}
      />
      <div className={styles.hidden}>
        <input
          type="file"
          className={styles.upload}
          name="files"
          ref={inputRef}
          onChange={handleOnchange}
          multiple
        />
      </div>
    </div>
  );
};

export default MyEditorOnlyAdmin;
