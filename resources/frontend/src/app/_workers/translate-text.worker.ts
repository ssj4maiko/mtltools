/// <reference lib="webworker" />

import { DictionaryCategory } from "../_models/dictionarycategory";
import { DictionaryEntry, EntryForm } from "../_models/dictionaryentry";

//import { DictionaryCategory, DictionaryEntry } from "../_models";
const scapeRegex = (entry:string) => {
  return entry.replace('-','\\-')
              .replace('[','\\[')
              .replace(']','\\]')
              .replace('(','\\(')
              .replace(')','\\)')
              ;
}
const replaceTextAllEntries = (entries: DictionaryEntry[], cloneText: string, cloneTitle: string) => {
  while (entries.length !== 0) {
    const entry = entries.pop();
    const regex = new RegExp(scapeRegex(entry.entryOriginal), 'g');
    const replace = entry.entryTranslation.length === 0 ? '' : '\[' + entry.idCategory + '\[<span class="replaced" '
      + (entry.description ? `title="${entry.description}"` : '')
      + ' id="replaced-' + entry.index[0] + '-' + entry.index[1] + '">'
      + entry.entryTranslation
      + '</span>\]' + entry.idCategory + '\]';
    cloneTitle = cloneTitle.replace(regex, replace);
    cloneText = cloneText.replace(regex, replace);
  }
  return [cloneText, cloneTitle];
}
const replaceTextAllFixes = (entries: DictionaryEntry[], cloneText: string, cloneTitle: string) => {
  while (entries.length !== 0) {
    const entry = entries.pop();
    let regex, replace;

    if (entry.sufix) {
      regex = new RegExp('(\]' + entry.sufix + '\]' + scapeRegex(entry.entryOriginal) + ')', 'g');
      replace = '<span class="replaced sufix" '
        + (entry.description ? `title="${entry.description}"` : '')
        + ' id="replaced-' + entry.index[0] + '-' + entry.index[1] + '">'
        + entry.entryTranslation
        + '</span>\]' + entry.idCategory + '\]';

    } else {
      regex = new RegExp('(' + scapeRegex(entry.entryOriginal) + '\\[' + entry.prefix + '\\[)', 'g');
      replace = '\[' + entry.idCategory + '\[<span class="replaced prefix" '
        + (entry.description ? `title="${entry.description}"` : '')
        + ' id="replaced-' + entry.index[0] + '-' + entry.index[1] + '">'
        + entry.entryTranslation
        + '</span>';
    }
    cloneTitle = cloneTitle.replace(regex, replace);
    cloneText = cloneText.replace(regex, replace);
  }
  return [cloneText, cloneTitle];
}
addEventListener('message', (data:MessageEvent) => {
  let {categories, text, title} = data.data as {categories:DictionaryCategory[], text:string, title:string};
  if (categories.length > 0) {
    let entries: DictionaryEntry[][] = [];
    let entriesFixes: DictionaryEntry[][] = [];
    categories.forEach((category, i) => {
      // Newly created Categories don't come with Entries, so let's not break the code
      if (category.entries) {
        category.entries.forEach((entry:EntryForm, j) => {
          // Newly created Entries won't have the variables set by default, which would break the code on AOT
          if (entry.entryOriginal && !entry.delete) {
            let regex = new RegExp('(\\p{P})+', 'gu');
            const simplified = entry.entryOriginal.replace(regex, '');
            const length = simplified.length;
            const insert = {
              entryOriginal: entry.entryOriginal,
              entryTranslation: entry.entryTranslation,
              description: entry.description,
              id: entry.id,
              idCategory: category.id,
              category: category.name,
              simplified: simplified,
              index: [i, j]
            } as DictionaryEntry;

            if ((!entry.sufix && !entry.prefix)) {
              if (!entries[length]) {
                entries[length] = [];
              }
              entries[length].push(insert);
            } else {

              insert.sufix = entry.sufix;
              insert.prefix = entry.prefix;

              if (!entriesFixes[length]) {
                entriesFixes[length] = [];
              }
              entriesFixes[length].push(insert);
            }
          }
        });
      }
    });
    try {
      for (let i = entries.length; i >= 0; --i) {
        if (entries[i]) {
          [text, title] = replaceTextAllEntries(entries[i], text, title);
        }
      }
      for (let i = entriesFixes.length; i >= 0; --i) {
        if (entriesFixes[i]) {
          [text, title] = replaceTextAllFixes(entriesFixes[i], text, title);
        }
      }
      console.log('finished translation');
    } catch (e) {
      console.error('TIMEOUT', e);
    }
    // The extra characters are to allow to create a space in between translated words
    const regexEnd = '\\][0-9]+\\]';
    const regexStart = '\\[[0-9]+\\[';
    try {
      let regex = new RegExp('(' + regexEnd + regexStart + ')+', 'gm');
      title = title.replace(regex, ' ');
      text = text.replace(regex, ' ');
      regex = new RegExp('(' + regexEnd + ')+', 'gm');
      title = title.replace(regex, '');
      text = text.replace(regex, '');
      regex = new RegExp('(' + regexStart + ')+', 'gm');
      title = title.replace(regex, '');
      text = text.replace(regex, '');
    } catch (e) {
      console.info(regexEnd + regexStart);
      console.error(e)
    }
  }

  postMessage({
    text,
    title
  });

});
