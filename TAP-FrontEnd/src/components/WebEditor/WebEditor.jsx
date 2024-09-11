import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEffect } from 'react';

const WebEditor = ({ editorRef, handleEditorDescriptionChange, height, defaultContent, placeHolder }) => {
   
    // 웹 에디터에서 맞춤법 검사 기능 비활성화
    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        const editorEl = editorInstance.getEditorElements().mdEditor;
        const wysiwygEl = editorInstance.getEditorElements().wwEditor;

        editorEl.spellcheck = false;
        wysiwygEl.spellcheck = false;
    }, []);

    return (
        <Editor
            placeholder={placeHolder}
            initialValue={defaultContent || ""}
            previewStyle="vertical" // 미리보기 스타일 지정
            height={height}
            initialEditType="wysiwyg" // 초기 입력모드 설정 (디폴트 markdown)
            toolbarItems={[
                // 필요한 툴바 옵션만 설정
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
            ]}
            ref={editorRef} // 상위 Component에서 useRef 추가하여 인자로 전달할 것
            onChange={handleEditorDescriptionChange} // 상위 Component에서 content onChange 함수 추가하여 인자로 전달할 것
        />
    );
}

export default WebEditor;
