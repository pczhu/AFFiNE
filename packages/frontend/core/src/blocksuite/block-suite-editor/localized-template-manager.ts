import { translateUiText } from '@affine/i18n';
import type {
  Template,
  TemplateManager,
} from '@blocksuite/affine/gfx/template';

function assetLabel(name: string) {
  const key = `Canvas asset: ${name}`;
  const label = translateUiText(key);
  return label === key ? name : label;
}

/** 只处理官方内置模板的文字副本，保留标识、样式和已有文档。 */
function localizeTemplateContent(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(localizeTemplateContent);
  }
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value).map(([field, content]) => {
      if (
        typeof content === 'string' &&
        ['insert', 'title', 'text', 'caption'].includes(field)
      ) {
        const key = `Canvas template: ${content.replace(/\s+/g, ' ').trim()}`;
        const translated = translateUiText(key);
        return [
          field,
          translated === key
            ? content
            : content.replace(content.trim(), translated),
        ];
      }
      return [field, localizeTemplateContent(content)];
    })
  );
}

function localizedTemplate(template: Template): Template {
  return {
    ...template,
    // 插入时读取当前语言，打开素材库后切换语言也不会插入旧译文。
    get content() {
      return localizeTemplateContent(template.content);
    },
  };
}

export function createLocalizedTemplateManager(
  manager: TemplateManager
): TemplateManager {
  return {
    categories: () => manager.categories(),
    list: async category =>
      (await manager.list(category)).map(localizedTemplate),
    search: async (keyword, category) => {
      const matches = new Set(await manager.search(keyword, category));
      const query = keyword.trim().toLocaleLowerCase();
      const categories = category ? [category] : await manager.categories();
      const groups = await Promise.all(
        categories.map(category => Promise.resolve(manager.list(category)))
      );
      for (const template of groups.flat()) {
        if (
          template.name &&
          assetLabel(template.name).toLocaleLowerCase().includes(query)
        ) {
          matches.add(template);
        }
      }
      return [...matches].map(localizedTemplate);
    },
  };
}
