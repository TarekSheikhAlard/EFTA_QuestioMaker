import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { observer } from 'mobx-react';
import { useVM } from '../../viewModels/context';

const Ckeditor = ({ classNames, validation }) => {
  const vm = useVM();

  return (
    <div className={classNames + " " + "my-class"}>
      <CKEditor
        editor={InlineEditor}
        placeholder="Type something here"
        data={vm.QuestionTitle || ""}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
        }}
        onReady={_editor => {
          if (vm.isRaadOnly) {
            _editor.isReadOnly = true;
          }
          // You can store the "_editor" and use when it is needed.
        }}
        onChange={(_event, _editor) => {
          if (vm.isRaadOnly) { _editor.isReadOnly = true; return; }
          const data = _editor.getData();
          if (data !== vm.QuestionTitle && data !== undefined) {
            vm.QuestionTitle = data;
          }
          validation();
        }}
        onBlur={(_event, _editor) => {
        }}
        onFocus={(_event, _editor) => {
        }}
        onError={(errInstance, errDetails) => {
          console.log('Error', errInstance, errDetails);
        }}
      />
    </div>
  );
}

export default observer(Ckeditor);

