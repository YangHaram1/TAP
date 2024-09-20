import { useState, useEffect, useRef, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from './MyEditor.module.css';
// import './MyEditor.css';
import Swal from 'sweetalert2';
import { api, tinymce } from '../../../../config/config'
import { useCheckList } from '../../../../store/store';
const MyEditor = ({ editorRef, height, setData, setRegexData }) => {

  const inputRef = useRef(null);
  const { chatSeq } = useCheckList();

  const handleEditorChange = (content) => {
    setData((prev) => {
      return { ...prev, contents: content }
    })
    const contentsRegex = /^([\s\S]{1,1000})$/;
    setRegexData((prev) => {
      return { ...prev, contents: contentsRegex.test(content) }
    })

  }



  const handleImages = () => {
    inputRef.current.click();
  }

    // 파일 사이즈 검사
    const formatFileSize = (size) => {
      if (size < 1024) return `${size} bytes`;
      if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`; // 정수로 반올림
      return `${Math.round(size / (1024 * 1024))} MB`; // 정수로 반올림
    };
  
    const checkSize = (file) => {
      const split = formatFileSize(file.size).split(' ');
      const size = parseInt(split[0], 10);
      const str = split[1];
      if (str === 'MB') {
        if (size <= 10) return true;
        else {
          Swal.fire({
            icon: 'error',
            title: '파일',
            text: '10MB 이하로 업로드 해주세요.'
          })
          return false;
        }
      }
      else {
        return true;
      }
    }

  //여기는 이미지 넣기
  const handleOnchange = () => {
    const files = inputRef.current.files;
    const formData = new FormData();
    const { chatSeq } = useCheckList.getState();

    for (let index = 0; index < files.length; index++) {
      const sizeCheck=checkSize(files[index]);
      if(sizeCheck){
        formData.append("files", files[index]);
      }
    }
    api.post(`/chatUpload?group_seq=${chatSeq}`, formData).then(resp => { //파일 로직 처리
      const array = resp.data;
      for (let index = 0; index < array.length; index++) {
        const imageUrl = `<img src="${array[index]}" alt="uploaded image"  style="width: 100px; height: 100px; border-radius: 10px;"/>`;
        const prevContent = editorRef.current.getContent();
        editorRef.current.setContent(prevContent + imageUrl);
      }

      inputRef.current.value = '';
    }).catch(error => {
      console.error('There was an error posting the data!', error);
    });
  }

  //붙여넣기
  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      const sizeCheck=checkSize(file);
      if(sizeCheck){
        formData.append('files', file); // FormData에 파일 추가
      }
      const response = await api.post(`/chatUpload?group_seq=${chatSeq}`, formData);
      const imageUrl = response.data[0]; // 서버에서 반환된 이미지 URL
      const image = `<img src="${imageUrl}" alt="uploaded image"  style="width: 100px; height: 100px; border-radius: 10px;" />`;
      const prevContent = editorRef.current.getContent();
      editorRef.current.setContent(prevContent + image);

    } catch (error) {
      console.error('파일 업로드 중 오류가 발생했습니다!', error);
      // TinyMCE에 실패를 알림
    }
  }
  const getBlobFromBlobUrl = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  };
  const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type });
  };
  //


  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <Editor
          apiKey={tinymce}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          onEditorChange={(content) => handleEditorChange(content)}
          init={{
            width: "auto",
            height: height,
            menubar: true,
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
                  // 사용 예
                  getBlobFromBlobUrl(images[0].src).then(blob => {
                    const file = blobToFile(blob, 'example.jpg');
                    handleImageUpload(file);
                  }).catch(error => {
                    console.error('파일로 변환하는 데 오류가 발생했습니다:', error);
                  });
                  e.preventDefault();
                  // console.log(tempDiv.innerHTML)
                  //   e.content = tempDiv.innerHTML;
                } else {
                  // 이미지가 없다면 다른 콘텐츠는 허용
                  e.content = tempDiv.innerHTML;
                }
              });
              editor.ui.registry.addButton('fileupload', {
                text: '📷',
                onSetup: (buttonApi) => {
                  setTimeout(() => {
                    const button = document.querySelector('button[data-mce-name="fileupload"]');
                    if (button) {
                      button.classList.add(styles.editorBtn); // 원하는 클래스 추가
                    }
                  }, 0); // 렌더링 후에 실행되도록 setTimeout 사용
                },
                onAction: (e) => {
                  handleImages();
                },
              });
              editor.on('PastePostProcess', (e) => {
                //console.log('After Paste:', e.node.innerHTML);
              });
            }
          }}

        />
      </div>
      <div className={styles.hidden}>
        <input type="file" className={styles.upload} name='files' ref={inputRef} onChange={handleOnchange} multiple accept="image/*" />
      </div>
    </div>);
};

export default MyEditor;