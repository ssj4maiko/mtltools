import { Injectable, Optional } from '@angular/core';
import { Observable, of, throwError, VirtualTimeScheduler } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { CacheService } from './cache.service';

import { Chapter } from './_models/chapter';
import { Novel } from './_models/novel';
import { Dictionary } from './_models/dictionary';
import { DictionaryCategory } from './_models/dictionarycategory';
import { DictionaryEntry } from './_models/dictionaryentry';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const apiUrl = environment.backendServer + '/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) { }





  _novels: object = {};







  _chapters: object = {};
  /*
		updateChapter(idNovel,noChapter,chapter): Observable<any> {
			const url = `${apiUrl}chapter/${idNovel}/${noChapter}`;
			return this.http.put<Chapter>(url, chapter, httpOptions)
				.pipe(
					 tap((chapter: Chapter) => console.log(`Updated Chapter id=${chapter.no}`))
					,catchError(this.handleError<Chapter>('updateChapter'))
				);
		}

		deleteChapter(idNovel,noChapter): Observable<Chapter> {
			const url = `${apiUrl}chapter/${idNovel}/${noChapter}`;

			return this.http.delete<Chapter>(url, httpOptions)
				.pipe(
					 tap(_ => console.log(`Deleted Chapter id=${noChapter}`))
					,catchError(this.handleError<Chapter>('deleteChapter'))
				);
		}
	*/






  _dictionaries: object = {};

  _categories: object = {};

  _entries: object = {};

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  Novels(): object {
    return this._novels;
  }
  Novel(id: number): Novel {
    if (this._novels[id]) {
      return this._novels[id];
    } else {
      return null;
    }
  }
  getNovels(): Observable<{}> {
    const url = `${apiUrl}novel`;

    return this.cacheService.get(
      url,
      this.http.get<{}>(url)
          .pipe(
             tap(novels => {
               console.log('Fetched Novels');

              for (const i in novels) {
                this._novels[ novels[i].id ] = novels[i];
              }
             })
            , catchError(this.handleError('getNovels', []))
      )
    );
  }

  addNovel(novel): Observable<Novel> {
    const url = `${apiUrl}novel/`;
    return this.http.post<Novel>(url, novel, httpOptions)
      .pipe(
         tap((novel: Novel) => {
           console.log(`Registered Novel id=${novel.id}`);
           this._novels[ novel.id ] = novel;
         })
        , catchError(this.handleError<Novel>('addNovel'))
      );
  }

  getNovel(id: number): Observable<Novel> {
    const url = `${apiUrl}novel/${id}`;
    return this.cacheService.get(
      url,
      this.http.get<Novel>(url)
          .pipe(
             tap(novel => {
               console.log(`Fetched Novel id=${id}`);
               this._novels[ novel.id ] = novel;
             })
            , catchError(this.handleError<Novel>(`getNovel id=${id}`))
          )
    );
  }

  updateNovel(id, novel): Observable<any> {
    const url = `${apiUrl}novel/${id}`;
    return this.http.put<Novel>(url, novel, httpOptions)
      .pipe(
         tap((novel: Novel) => {
           console.log(`Updated Novel id=${novel.id}`);
           this._novels[ novel.id ] = novel;
         })
        , catchError(this.handleError<Novel>('updateNovel'))
      );
  }

  deleteNovel(id): Observable<Novel> {
    const url = `${apiUrl}novel/${id}`;

    return this.http.delete<Novel>(url, httpOptions)
      .pipe(
         tap(_ => {
           console.log(`Deleted Novel id=${id}`);
           delete this._novels[id];
         })
        , catchError(this.handleError<Novel>('deleteNovel'))
      );
    }

    updateIndexNovel(id): Observable<Novel> {
        const url = `${apiUrl}chapter/autoUpdate/${id}`;
        return this.http.get<Novel>(url)
            .pipe(
                tap((novel: Novel) => {
                    console.log(`Updated All Chapters id=${novel.id}`);
                    this._novels[novel.id] = novel;

                    this.cacheService.delete(`${apiUrl}chapter/${novel.id}`);
                    if (this._chapters[novel.id]) {
                        delete this._chapters[novel.id];
                    }
                })
                , catchError(this.handleError<Novel>('updateIndexNovel'))
            );
    }

  Chapters(idNovel): object {
    if (this._chapters[idNovel]) {
      return this._chapters[idNovel];
    } else {
      return [];
    }
  }
  Chapter(idNovel, noChapter: number): Chapter {
    if (this._chapters[idNovel]) {
      if (this._chapters[idNovel][noChapter]) {
        return this._chapters[idNovel][noChapter];
      }
    }
    return null;
    }
    getChapters(idNovel, force?: boolean): Observable<{}> {
        const url = `${apiUrl}chapter/${idNovel}`;
        if (force) { this.cacheService.delete(url); }

        return this.cacheService.get(
      url,
      this.http.get<{}>(url)
          .pipe(
             tap(chapters => {
               console.log('Fetched chapters');
               if (chapters && chapters[0]) {
                 if (!this._chapters[ idNovel ]) {
                   this._chapters[ idNovel ] = {};
                  }

                for (const i in chapters) {
                  // No need to rewrite entries with filled chapters
                  if (this._chapters[ idNovel ][ chapters[i].no ]) {
                    if (this._chapters[ idNovel ][ chapters[i].no ].textOriginal) {
                                            if (this._chapters[idNovel][chapters[i].no].dateOriginalRevision == chapters[i].dateOriginalRevision) {
                                                continue;
                                            }
                                        }
                                    }
                  this._chapters[ idNovel ][ chapters[i].no ] = chapters[i];
                }
               }
             })
            , catchError(this.handleError('getchapters', []))
      )
    );
  }
  /*
		addChapter(idNovel,chapter): Observable<Chapter> {
			const url = `${apiUrl}chapter/${idNovel}`;
			return this.http.post<Chapter>(url, chapter, httpOptions)
				.pipe(
					 tap((chapter: Chapter) => {
					 	console.log(`Registered Chapter id=${chapter.no}`);
				 		if(!this._chapters[ idNovel ])
				 			this._chapters[ idNovel ] = {};
					 	this._chapters[ idNovel ][ chapter.no ] = chapter;
					 })
					,catchError(this.handleError<Chapter>('addChapter'))
				);
		}
	*/
  getAutoChapter(idNovel): Observable<any> {
    const url = `${apiUrl}chapter/auto/${idNovel}`;
    return this.http.get(url)
      .pipe(
         tap((pack: any) => {
           this._novels[ idNovel ] = pack.novel;

           if (!this._chapters[ idNovel ]) {
             this._chapters[ idNovel ] = {};
            }
           this._chapters[ idNovel ][ pack.chapter.no ] = pack.chapter;
         })
        , catchError(this.handleError<Chapter>('addChapter'))
      );
  }
    autoUpdateChapters(idNovel): Observable<any> {
        const url = `${apiUrl}chapter/autoUpdate/${idNovel}`;
        return this.http.get(url)
            .pipe(
                tap((novel: Novel) => {
                    this._novels[idNovel] = novel;
                })
                , catchError(this.handleError<Chapter>('addChapter'))
            );
    }
  getChapter(idNovel, noChapter: number): Observable<Chapter> {
    const url = `${apiUrl}chapter/${idNovel}/${noChapter}`;
    return this.http.get<Chapter>(url)
      .pipe(
         tap((chapter: Chapter) => {
           console.log(`Fetched Chapter id=${chapter.no}`);
           if (!this._chapters[ idNovel ]) {
             this._chapters[ idNovel ] = {};
            }
           this._chapters[ idNovel ][ chapter.no ] = chapter;
         })
        , catchError(this.handleError<Chapter>(`getChapter id=${noChapter}`))
      );
  }

  Dictionaries(): object {
    if (this._dictionaries) {
      return this._dictionaries;
    } else {
      return [];
    }
  }
  Dictionary(language: number): Dictionary {
    if (this._dictionaries) {
      if (this._dictionaries[language]) {
        return this._dictionaries[language];
      }
    }
    return null;
  }
  getDictionaries(): Observable<{}> {
    const url = `${apiUrl}dictionary/`;

    return this.cacheService.get(
      url,
      this.http.get<{}>(url)
          .pipe(
             tap(dictionaries => {
               console.log('Fetched Dictionaries');
               if (dictionaries && dictionaries[0]) {
                 this._dictionaries = {};

                for (const i in dictionaries) {
                  this._dictionaries[ dictionaries[i].id ] = dictionaries[i];
                }
               }
             })
            , catchError(this.handleError('getDictionaries', []))
      )
    );
  }

  getDictionary(id: number): Observable<Dictionary> {
    const url = `${apiUrl}dictionary/${id}`;
    return this.cacheService.get(
      url,
      this.http.get<Dictionary>(url)
          .pipe(
             tap(dictionary => {
               console.log(`Fetched Dictionary id=${id}`);
               console.log(dictionary);
               if (!this._dictionaries) {
                 this._dictionaries = {};
                }
               this._dictionaries[ dictionary.id ] = dictionary;
             })
            , catchError(this.handleError<Dictionary>(`getDictionary id=${id}`))
          )
    );
  }

  addDictionary(dictionary): Observable<Dictionary> {
    const url = `${apiUrl}dictionary/`;
    return this.http.post<Dictionary>(url, dictionary, httpOptions)
      .pipe(
         tap((dictionary: Dictionary) => {
           console.log(`Registered Dictionary id=${dictionary.id}`);
           if (!this._dictionaries) {
             this._dictionaries = {};
            }
           this._dictionaries[ dictionary.id ] = dictionary;
         })
        , catchError(this.handleError<Dictionary>('addDictionary'))
      );
  }

  updateDictionary(id: number, dictionary): Observable<any> {
    const url = `${apiUrl}dictionary/${id}`;
    return this.http.put<Dictionary>(url, dictionary, httpOptions)
      .pipe(
         tap((dictionary: Dictionary) => {
           console.log(`Updated Dictionary id=${dictionary.id}`);
           if (!this._dictionaries) {
                         this._dictionaries = {};
            }
           console.log(this._dictionaries[dictionary.id]);
                    for (const i in dictionary) {
                        console.log(i);
                        this._dictionaries[ dictionary.id ][i] = dictionary[i];
                    }
         })
        , catchError(this.handleError<Dictionary>('updateDictionary'))
      );
  }

  deleteDictionary(id): Observable<Dictionary> {
    const url = `${apiUrl}dictionary/${id}`;

    return this.http.delete<Dictionary>(url, httpOptions)
      .pipe(
         tap(_ => {
           console.log(`Deleted Dictionary id=${id}`);
           delete this._dictionaries[id];
         })
        , catchError(this.handleError<Dictionary>('deleteNovel'))
      );
    }

    dictionaryCreateCache(idDictionary: number): Observable<any> {
        const url = `${apiUrl}cache/dictionary/${idDictionary}`;

        return this.http.put<any>(url, httpOptions)
            .pipe(
                tap(_ => {
                    console.log(`Cached Dictionary id=${idDictionary}`);
                    console.log(_);
                })
                , catchError(this.handleError<Dictionary>('deleteNovel'))
            );
    }
  setDictionaries(dictionaries: Dictionary[]): void {
    if (!this._dictionaries) {
      this._dictionaries = {};
    }
    const self = this;
    dictionaries.forEach((dictionary) => {
      self._dictionaries[dictionary.id] = dictionary;
    });
  }
    dictionaryCache(idDictionary: number): Observable<{}> {
        const url = `${apiUrl}cache/dictionary/${idDictionary}?${this._dictionaries[idDictionary].dateRevision}`;

        return this.cacheService.get(
            url,
            this.http.get<any>(url)
                .pipe(
                    tap(cache => {
                        console.log('Fetched Cache');

                        if (cache.length == 1) {
                            cache = cache[0];
                            if (cache.dictionary_entry.length > 0) {
                                cache.dictionary_entry.forEach(entry => {
                                    if (!this._entries[entry.idCategory]) {
                                        this._entries[entry.idCategory] = [];
                                    }
                                    this._entries[entry.idCategory][entry.id] = entry;
                                });
                            }
                            if (cache.dictionary_category.length > 0) {
                                if (!this._categories[idDictionary]) {
                                    this._categories[idDictionary] = [];
                                }
                                cache.dictionary_category.forEach(category => {
                                    if (!this._categories[category.idDictionary][category.id]) {
                                        this._categories[category.idDictionary][category.id] = {};
                                    }
                                    for (const i in category) {
                                        this._categories[category.idDictionary][category.id][i] = category[i];
                                    }
                                    this._categories[category.idDictionary][category.id].count_entries = [];
                                    this._categories[category.idDictionary][category.id].count_entries[0] = {};
                                    this._categories[category.idDictionary][category.id].count_entries[0].count = this._entries[category.id] ?
                                                                                                                    Object.keys(this._entries[category.id]).length
                                                                                                                    : 0;
                                });
                            }
                        }
                    })
                    , catchError(this.handleError('getCategory', []))
                )
        );
    }
    saveFullDictionary(idDictionary: number, dictionary: any): Observable<any> {
        const url = `${apiUrl}dictionary/fullSave/${idDictionary}`;
        return this.http.put<any>(url, dictionary, httpOptions)
            .pipe(
                tap(res => {
                    if (res.changes) {
                        this._dictionaries[idDictionary].dateRevision = res.dateRevision;
                        this.cacheService.delete(`${apiUrl}dictionary/cache/${idDictionary}?${this._dictionaries[idDictionary].dateRevision}`);
                    }
                })
                , catchError(this.handleError<any>('getCategory'))
            );
    }




    updateCounterCategory(no: any, idDictionary: number): void {
        switch (no) {
            case '+':
                ++this._dictionaries[idDictionary].count_categories[0].count;
                break;
            case '-':
                --this._dictionaries[idDictionary].count_categories[0].count;
                break;
            default:
                this._dictionaries[idDictionary].count_categories[0].count = no;
        }
    }

  Categories(idDictionary): object {
    if (this._categories[idDictionary]) {
      return this._categories[idDictionary];
    } else {
      return [];
    }
  }
  Category(idDictionary, id: number): DictionaryCategory {
    if (this._categories[idDictionary]) {
      if (this._categories[idDictionary][id]) {
        return this._categories[idDictionary][id];
      }
    }
    return null;
    }
  getCategories(idDictionary, force?: boolean): Observable<{}> {
        const url = `${apiUrl}category/${idDictionary}`;
        if (force) { this.cacheService.delete(url); }

        return this.cacheService.get(
      url,
      this.http.get<{}>(url)
          .pipe(
             tap(categories => {
               console.log('Fetched Category');
               if (categories && categories[0]) {
                 this._categories[ idDictionary ] = {};

                 let counter = 0;
                for (const i in categories) {
          ++counter;
          this._categories[ idDictionary ][ categories[i].id ] = categories[i];
        }
                 this.updateCounterCategory(counter, idDictionary);
               }
             })
            , catchError(this.handleError('getCategory', []))
      )
    );
  }

    getCategory(idDictionary: number, id: number): Observable<DictionaryCategory> {
    const url = `${apiUrl}category/${idDictionary}/${id}`;
    return this.cacheService.get(
      url,
      this.http.get<DictionaryCategory>(url)
          .pipe(
             tap(categories => {
               console.log(`Fetched Category id=${id}`);
               console.log(categories);
               if (!this._categories[ categories.idDictionary ]) {
                 this._categories[ categories.idDictionary ] = {};
                }
               this._categories[ categories.idDictionary ][ categories.id ] = categories;
             })
            , catchError(this.handleError<DictionaryCategory>(`getCategory id=${id}`))
          )
    );
  }

  addCategory(idDictionary: number, category): Observable<DictionaryCategory> {
    const url = `${apiUrl}category/${idDictionary}`;
    return this.http.post<DictionaryCategory>(url, category, httpOptions)
      .pipe(
         tap((category: DictionaryCategory) => {
           console.log(`Registered Category id=${category.id}`);
           if (!this._categories[ category.idDictionary ]) {
             this._categories[ category.idDictionary ] = {};
            }
           this._categories[category.idDictionary][category.id] = category;
           this.updateCounterCategory('+', idDictionary);
         })
        , catchError(this.handleError<DictionaryCategory>('addCategory'))
      );
  }

    updateCategory(idDictionary: number, id: number, category): Observable<any> {
    const url = `${apiUrl}category/${idDictionary}/${id}`;
    return this.http.put<DictionaryCategory>(url, category, httpOptions)
      .pipe(
         tap((category: DictionaryCategory) => {
           console.log(`Updated Category id=${category.id}`);
           if (!this._categories[ category.idDictionary ]) {
             this._categories[ category.idDictionary ] = {};
            }
           this._categories[ category.idDictionary ][ category.id ] = category;
         })
        , catchError(this.handleError<DictionaryCategory>('updateCategory'))
      );
  }

  deleteCategory(idDictionary: number, id): Observable<DictionaryCategory> {
    const url = `${apiUrl}category/${idDictionary}/${id}`;

    return this.http.delete<DictionaryCategory>(url, httpOptions)
      .pipe(
         tap(_ => {
           console.log(`Deleted Category id=${id}`);
           delete this._categories[idDictionary][id];
           this.updateCounterCategory('-', idDictionary);
         })
        , catchError(this.handleError<DictionaryCategory>('deleteNovel'))
      );
  }





    updateCounterEntry(no: any, idDictionary: number, idCategory: number): void {
        if (this._categories[idDictionary][idCategory].count_entries) {
            switch (no) {
                case '+':
                    ++this._categories[ idDictionary ][ idCategory ].count_entries[0].count;
                    break;
                case '-':
                    --this._categories[ idDictionary ][ idCategory ].count_entries[0].count;
                    break;
                default:
                    if (this._categories[idDictionary][idCategory].count_entries) {
                        this._categories[idDictionary][idCategory].count_entries = [];
                    }
                    this._categories[ idDictionary ][ idCategory ].count_entries[0].count = no;
            }
        }
    }

  Entries(idCategory): object {
    if (this._entries[idCategory]) {
      return this._entries[idCategory];
    } else {
      return [];
    }
  }
  Entry(idCategory, id: number): DictionaryEntry {
    if (this._entries[idCategory]) {
      if (this._entries[idCategory][id]) {
        return this._entries[idCategory][id];
      }
    }
    return null;
  }
    getEntries(idDictionary: number, idCategory, force?: boolean): Observable<{}> {
        const url = `${apiUrl}entry/${idCategory}`;
        return this.http.get<DictionaryEntry[]>(url)
                .pipe(
                        tap(entries => {
                        console.log('Fetched Entries');
                        if (entries && entries[0]) {
                            this._entries[ idCategory ] = {};

                            for (const i in entries) {
                                this._entries[ idCategory ][ entries[i].id ] = entries[i];
                            }
                            }
                        if (force) {
                            this.updateCounterEntry(entries.length, idDictionary, idCategory);
                            }

                        })
                    , catchError(this.handleError('getCategory', []))
        );
  }

    addEntries(idDictionary: number, idCategory: number, entries): Observable<any> {
        const url = `${apiUrl}entry/updatecategory/${idCategory}`;
        return this.http.post<DictionaryEntry>(url, entries, httpOptions)
      .pipe(
         tap(_ => {
                    // this.getEntries(idDictionary, idCategory, true);
                 })
        , catchError(this.handleError<DictionaryEntry>('addCategory'))
      );
  }

  updateEntry(idCategory: number, id: number, category): Observable<any> {
    const url = `${apiUrl}entry/${idCategory}/${id}`;
    return this.http.put<DictionaryEntry>(url, category, httpOptions)
      .pipe(
         tap((entry: DictionaryEntry) => {
           console.log(`Updated entry id=${entry.id}`);
           if (!this._entries[ entry.idCategory ]) {
                            this._entries[entry.idCategory ] = {};
            }
           this._entries[entry.idCategory][entry.id] = entry;
         })
        , catchError(this.handleError<DictionaryEntry>('updateCategory'))
      );
  }

  deleteEntry(idCategory: number, id): Observable<DictionaryEntry> {
    const url = `${apiUrl}entry/${idCategory}/${id}`;

    return this.http.delete<DictionaryEntry>(url, httpOptions)
      .pipe(
         tap(_ => {
           console.log(`Deleted Category id=${id}`);
           delete this._entries[idCategory][id];
         })
        , catchError(this.handleError<DictionaryEntry>('deleteNovel'))
      );
  }
}
