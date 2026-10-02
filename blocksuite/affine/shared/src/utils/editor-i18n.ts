type EditorTranslator = (text: string) => string;

let translator: EditorTranslator = text => text;

/** 由宿主应用提供语言服务，独立使用编辑器时保留原始文案。 */
export function configureEditorI18n(translate: EditorTranslator) {
  translator = translate;
}

export function editorText(text: string): string {
  return translator(text);
}

/** 切换语言后刷新编辑器界面，不修改文档中的文字或存储数据。 */
export function refreshEditorTranslations(root: Document | ShadowRoot) {
  for (const element of root.querySelectorAll('*')) {
    if (element.shadowRoot) {
      refreshEditorTranslations(element.shadowRoot);
    }
    if (
      element.localName.includes('-') &&
      'requestUpdate' in element &&
      typeof element.requestUpdate === 'function'
    ) {
      element.requestUpdate();
    }
  }
}
