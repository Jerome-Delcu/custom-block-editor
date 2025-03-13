import Embed from '@editorjs/embed';
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import ImageTool from '@editorjs/image';
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import QuizBlock from '../components/QuizBlock';

export const getEditorJsTools = (imageByFile) => ({
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  quiz: QuizBlock,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: imageByFile,
        // byUrl: `http://localhost:8008/fetchUrl?orgId=${org}`,
      },
      types: 'image/*,video/mp4,video/webm',
    }
  }
});