const PLUGIN_ID = 'com.kaka.cssvarautocomplete';

class CssVarAutocomplete {
  constructor() {
    this.completer = null;
    this.variables = [];
    this.debounceTimer = null;
    this.changeHandler = null;
  }

  parseVariables() {
    try {
      const { editor } = editorManager;
      const content = editor.session.getValue();
      const regex = /--([\w-]+)\s*:/g;
      const vars = new Set();
      let match;

      while ((match = regex.exec(content)) !== null) {
        vars.add(`--${match[1]}`);
      }

      this.variables = Array.from(vars);
    } catch (e) {
      this.variables = [];
    }
  }

  async init($page, cacheFile, cacheFileUrl) {
    const { editor } = editorManager;

    this.completer = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        if (!prefix || this.variables.length === 0) {
          callback(null, []);
          return;
        }

        const lower = prefix.toLowerCase();
        const suggestions = this.variables
          .filter(v => v.toLowerCase().includes(lower))
          .map(v => ({
            caption: v,
            value: `var(${v})`,
            meta: 'variable',
            score: 1000
          }));

        callback(null, suggestions);
      }
    };

    setTimeout(() => {
      try {
        this.parseVariables();

        if (window.ace) {
          const langTools = ace.require('ace/ext/language_tools');
          if (langTools && typeof langTools.addCompleter === 'function') {
            langTools.addCompleter(this.completer);
          }
        }
      } catch (e) {
        console.error('CssVarAutocomplete init error:', e);
      }
    }, 1500);

    this.changeHandler = () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.parseVariables();
      }, 500);
    };

    editor.session.on('change', this.changeHandler);
  }

  async destroy() {
    try {
      const { editor } = editorManager;
      clearTimeout(this.debounceTimer);

      if (this.changeHandler) {
        editor.session.off('change', this.changeHandler);
      }

      if (window.ace && this.completer) {
        const langTools = ace.require('ace/ext/language_tools');
        if (langTools && langTools.completers) {
          langTools.completers = langTools.completers.filter(
            c => c !== this.completer
          );
        }
      }
    } catch (e) {
      console.error('CssVarAutocomplete destroy error:', e);
    }
  }
}

if (window.acode) {
  const plugin = new CssVarAutocomplete();
  acode.setPluginInit(
    PLUGIN_ID,
    (baseUrl, $page, { cacheFile, cacheFileUrl }) => {
      if (!baseUrl.endsWith('/')) baseUrl += '/';
      plugin.baseUrl = baseUrl;
      return plugin.init($page, cacheFile, cacheFileUrl);
    }
  );
  acode.setPluginUnmount(PLUGIN_ID, () => plugin.destroy());
}