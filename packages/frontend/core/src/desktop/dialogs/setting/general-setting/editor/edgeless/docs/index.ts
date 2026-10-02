import { getAFFiNEWorkspaceSchema } from '@affine/core/modules/workspace';
import { WorkspaceImpl } from '@affine/core/modules/workspace/impls/workspace';
import { translateUiText } from '@affine/i18n';
import type { DocSnapshot, Store } from '@blocksuite/affine/store';
import { Transformer } from '@blocksuite/affine/store';
import { Doc as YDoc } from 'yjs';
export const getCollection = (() => {
  let collection: WorkspaceImpl | null = null;
  return function () {
    if (collection) {
      return collection;
    }
    collection = new WorkspaceImpl({
      id: 'edgeless-settings',
      rootDoc: new YDoc({ guid: 'edgeless-settings' }),
    });
    collection.meta.initialize();
    return collection;
  };
})();

export type DocName =
  | 'note'
  | 'pen'
  | 'shape'
  | 'flow'
  | 'text'
  | 'connector'
  | 'mindmap'
  | 'frame';

const docMap = new Map<string, Promise<Store | undefined>>();

async function loadNote() {
  return (await import('./note.json')).default;
}

async function loadPen() {
  return (await import('./pen.json')).default;
}

async function loadShape() {
  return (await import('./shape.json')).default;
}

async function loadFrame() {
  return (await import('./frame.json')).default;
}

async function loadFlow() {
  return (await import('./flow.json')).default;
}

async function loadText() {
  return (await import('./text.json')).default;
}

async function loadConnector() {
  return (await import('./connector.json')).default;
}

async function loadMindmap() {
  return (await import('./mindmap.json')).default;
}

const loaders = {
  note: loadNote,
  pen: loadPen,
  shape: loadShape,
  frame: loadFrame,
  flow: loadFlow,
  text: loadText,
  connector: loadConnector,
  mindmap: loadMindmap,
};

export async function getDocByName(name: DocName, language: string) {
  const cacheKey = `${name}:${language}`;
  if (docMap.get(cacheKey)) {
    return docMap.get(cacheKey);
  }

  const promise = initDoc(name, language);
  docMap.set(cacheKey, promise);
  return promise;
}

async function initDoc(name: DocName, language: string) {
  // 只翻译设置面板自带的示例，不修改用户的文档。
  const snapshot = JSON.parse(
    JSON.stringify(await loaders[name]()),
    (key, value: unknown) => {
      return ['insert', 'title', 'text'].includes(key) &&
        typeof value === 'string'
        ? translateUiText(value, language)
        : value;
    }
  ) as DocSnapshot;
  snapshot.meta.id += '-' + language;
  const collection = getCollection();
  const transformer = new Transformer({
    schema: getAFFiNEWorkspaceSchema(),
    blobCRUD: collection.blobSync,
    docCRUD: {
      create: (id: string) => collection.createDoc(id).getStore({ id }),
      get: (id: string) => collection.getDoc(id)?.getStore({ id }) ?? null,
      delete: (id: string) => collection.removeDoc(id),
    },
    middlewares: [],
  });

  return await transformer.snapshotToDoc(snapshot);
}
