import { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { debounce } from 'lodash';
import styles from './MyEditor.module.css';
// import './MyEditor.css';
import  Swal  from 'sweetalert2';
import { api,tinymce } from '../../config/config';

const MyEditorOnlyAdmin = ({ editorRef , height}) => {
    const [content, setContent] = useState('');
    const editorRefLocal = useRef(null);
  
    useEffect(() => {
      if (editorRef) {
        editorRef.current = editorRefLocal.current;
      }
    }, [editorRef]);
  
    const handleEditorChange = (content) => {
      setContent(content);
      // Handle any other changes or side effects
    };
  
    const handleSave = () => {
      Swal.fire({
        title: 'Save Changes?',
        text: "Do you want to save your changes?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // Add your save logic here
          console.log('Content saved:', content);
        }
      });
    };
  
    return (
      <div className={styles.editorContainer}>
        <Editor
          onInit={(evt, editor) => (editorRefLocal.current = editor)}
          initialValue={content}
          init={{
            height: height || '500',
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
          onEditorChange={debounce(handleEditorChange, 300)}
        />
        <button onClick={handleSave} className={styles.saveButton}>Save</button>
      </div>
    );
  };
export default MyEditorOnlyAdmin;