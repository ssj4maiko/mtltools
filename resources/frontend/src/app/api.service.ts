import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { CacheService } from './cache.service';

import { Chapter } from './_models/chapter';
import { Novel } from './_models/novel';
import { Dictionary } from './_models/dictionary';
import { DictionaryCategory } from './_models/dictionarycategory';
import { DictionaryEntry } from './_models/dictionaryentry';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
const apiUrl = "http://192.168.1.9:4000/api/";

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(
		private http: HttpClient,
		private cacheService: CacheService
	) { }

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}





	_novels: object = {};

	Novels(): object {
		return this._novels;
	}
	Novel(id:number): Novel{
		if(this._novels[id])
			return this._novels[id];
		else
			return null;
	}
	getNovels(): Observable<{}>{
		const url = `${apiUrl}novel/`;

		return this.cacheService.get(
			url,
			this.http.get<{}>(url)
					.pipe(
						 tap(novels => {
						 	console.log('Fetched Novels');

							for(let i in novels){
								this._novels[ novels[i].id ] = novels[i];
							}
						 })
						,catchError(this.handleError('getNovels',[]))
			)
		)
	}

	addNovel(novel): Observable<Novel> {
		const url = `${apiUrl}novel/`;
		return this.http.post<Novel>(url, novel, httpOptions)
			.pipe(
				 tap((novel: Novel) => {
				 	console.log(`Registered Novel id=${novel.id}`);
				 	this._novels[ novel.id ] = novel;
				 })
				,catchError(this.handleError<Novel>('addNovel'))
			);
	}

	getNovel(id: number): Observable<Novel>{
		const url = `${apiUrl}novel/${id}`;
		return this.cacheService.get(
			url,
			this.http.get<Novel>(url)
					.pipe(
						 tap(novel => {
						 	console.log(`Fetched Novel id=${id}`);
						 	this._novels[ novel.id ] = novel;
						 })
						,catchError(this.handleError<Novel>(`getNovel id=${id}`))
					)
		);
	}

	updateNovel(id,novel): Observable<any> {
		const url = `${apiUrl}novel/${id}`;
		return this.http.put<Novel>(url, novel, httpOptions)
			.pipe(
				 tap((novel: Novel) => {
				 	console.log(`Updated Novel id=${novel.id}`);
				 	this._novels[ novel.id ] = novel;
				 })
				,catchError(this.handleError<Novel>('updateNovel'))
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
				,catchError(this.handleError<Novel>('deleteNovel'))
			);
	}







	_chapters: object = {};

	Chapters(idNovel): object {
		if(this._chapters[idNovel])
			return this._chapters[idNovel];
		else
			return null;
	}
	Chapter(idNovel, noChapter:number): Chapter{
		if(this._chapters[idNovel])
			if(this._chapters[idNovel][noChapter])
				return this._chapters[idNovel][noChapter];
		return null;
	}
	getChapters(idNovel): Observable<{}>{
		const url = `${apiUrl}chapter/${idNovel}`;
		return this.cacheService.get(
			url,
			this.http.get<{}>(url)
					.pipe(
						 tap(chapters => {
						 	console.log('Fetched chapters');
						 	if(chapters && chapters[0]){
						 		if(!this._chapters[ idNovel ])
						 			this._chapters[ idNovel ] = {};

								for(let i in chapters){
									// No need to rewrite entries with filled chapters
									if(this._chapters[ idNovel ][ chapters[i].no ])
										if(this._chapters[ idNovel ][ chapters[i].no ].textOriginal)
											continue;

									this._chapters[ idNovel ][ chapters[i].no ] = chapters[i];
								}
						 	}
						 })
						,catchError(this.handleError('getchapters',[]))
			)
		)
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
	getAutoChapter(idNovel): Observable<any>{
		const url = `${apiUrl}chapter/auto/${idNovel}`;
		return this.http.get(url)
			.pipe(
				 tap((pack: any) => {
				 	this._novels[ idNovel ] = pack.novel;

			 		if(!this._chapters[ idNovel ])
			 			this._chapters[ idNovel ] = {};
				 	this._chapters[ idNovel ][ pack.chapter.no ] = pack.chapter;
				 })
				,catchError(this.handleError<Chapter>('addChapter'))
			);
	}

	getChapter(idNovel, noChapter: number): Observable<Chapter>{
		const url = `${apiUrl}chapter/${idNovel}/${noChapter}`;
		return this.http.get<Chapter>(url)
			.pipe(
				 tap((chapter: Chapter) => {
				 	console.log(`Fetched Chapter id=${chapter.no}`);
			 		if(!this._chapters[ idNovel ])
			 			this._chapters[ idNovel ] = {};
				 	this._chapters[ idNovel ][ chapter.no ] = chapter;
				 })
				,catchError(this.handleError<Chapter>(`getChapter id=${noChapter}`))
			);
	}
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

	Dictionaries(idNovel): object {
		if(this._dictionaries[idNovel])
			return this._dictionaries[idNovel];
		else
			return null;
	}
	Dictionary(idNovel, language:number): Dictionary{
		if(this._dictionaries[idNovel])
			if(this._dictionaries[idNovel][language])
				return this._dictionaries[idNovel][language];
		return null;
	}
	getDictionaries(idNovel): Observable<{}>{
		const url = `${apiUrl}dictionary/${idNovel}`;

		return this.cacheService.get(
			url,
			this.http.get<{}>(url)
					.pipe(
						 tap(dictionaries => {
						 	console.log('Fetched Dictionaries');
						 	if(dictionaries && dictionaries[0]){
						 		if(!this._dictionaries[ idNovel ])
						 			this._dictionaries[ idNovel ] = {};

								for(let i in dictionaries){
									this._dictionaries[ idNovel ][ dictionaries[i].id ] = dictionaries[i];
								}
						 	}
						 })
						,catchError(this.handleError('getDictionaries',[]))
			)
		)
	}

	getDictionary(idNovel:number, id: number): Observable<Dictionary>{
		const url = `${apiUrl}dictionary/${idNovel}/${id}`;
		return this.cacheService.get(
			url,
			this.http.get<Dictionary>(url)
					.pipe(
						 tap(dictionary => {
						 	console.log(`Fetched Dictionary id=${id}`);
						 	console.log(dictionary);
					 		if(!this._dictionaries[ dictionary.idNovel ])
					 			this._dictionaries[ dictionary.idNovel ] = {};
						 	this._dictionaries[ dictionary.idNovel ][ dictionary.id ] = dictionary;
						 })
						,catchError(this.handleError<Dictionary>(`getDictionary id=${id}`))
					)
		);
	}

	addDictionary(idNovel:number, dictionary): Observable<Dictionary> {
		const url = `${apiUrl}dictionary/${idNovel}`;
		return this.http.post<Dictionary>(url, dictionary, httpOptions)
			.pipe(
				 tap((dictionary: Dictionary) => {
				 	console.log(`Registered Dictionary id=${dictionary.id}`);
			 		if(!this._dictionaries[ dictionary.idNovel ])
			 			this._dictionaries[ dictionary.idNovel ] = {};
				 	this._dictionaries[ dictionary.idNovel ][ dictionary.id ] = dictionary;
				 })
				,catchError(this.handleError<Dictionary>('addDictionary'))
			);
	}

	updateDictionary(idNovel:number,id:number,dictionary): Observable<any> {
		const url = `${apiUrl}dictionary/${idNovel}/${id}`;
		return this.http.put<Dictionary>(url, dictionary, httpOptions)
			.pipe(
				 tap((dictionary: Dictionary) => {
				 	console.log(`Updated Dictionary id=${dictionary.id}`);
			 		if(!this._dictionaries[ dictionary.idNovel ])
			 			this._dictionaries[ dictionary.idNovel ] = {};
				 	this._dictionaries[ dictionary.idNovel ][ dictionary.id ] = dictionary;
				 })
				,catchError(this.handleError<Dictionary>('updateDictionary'))
			);
	}

	deleteDictionary(idNovel:number,id): Observable<Dictionary> {
		const url = `${apiUrl}dictionary/${idNovel}/${id}`;

		return this.http.delete<Dictionary>(url, httpOptions)
			.pipe(
				 tap(_ => {
				 	console.log(`Deleted Dictionary id=${id}`);
				 	delete this._dictionaries[idNovel][id];
				 })
				,catchError(this.handleError<Dictionary>('deleteNovel'))
			);
	}






	_categories: object = {};

	Categories(idDictionary): object {
		if(this._categories[idDictionary])
			return this._categories[idDictionary];
		else
			return null;
	}
	Category(idDictionary, id:number): DictionaryCategory{
		if(this._categories[idDictionary])
			if(this._categories[idDictionary][id])
				return this._categories[idDictionary][id];
		return null;
	}
	getCategories(idDictionary): Observable<{}>{
		const url = `${apiUrl}category/${idDictionary}`;

		return this.cacheService.get(
			url,
			this.http.get<{}>(url)
					.pipe(
						 tap(categories => {
						 	console.log('Fetched Category');
						 	if(categories && categories[0]){
						 		if(!this._categories[ idDictionary ])
						 			this._categories[ idDictionary ] = {};

								for(let i in categories){
									this._categories[ idDictionary ][ categories[i].id ] = categories[i];
								}
						 	}
						 })
						,catchError(this.handleError('getCategory',[]))
			)
		)
	}

	getCategory(idDictionary:number, id: number): Observable<DictionaryCategory>{
		const url = `${apiUrl}category/${idDictionary}/${id}`;
		return this.cacheService.get(
			url,
			this.http.get<DictionaryCategory>(url)
					.pipe(
						 tap(categories => {
						 	console.log(`Fetched Category id=${id}`);
						 	console.log(categories);
					 		if(!this._categories[ categories.idDictionary ])
					 			this._categories[ categories.idDictionary ] = {};
						 	this._categories[ categories.idDictionary ][ categories.id ] = categories;
						 })
						,catchError(this.handleError<DictionaryCategory>(`getCategory id=${id}`))
					)
		);
	}

	addCategory(idDictionary:number, category): Observable<DictionaryCategory> {
		const url = `${apiUrl}category/${idDictionary}`;
		return this.http.post<DictionaryCategory>(url, category, httpOptions)
			.pipe(
				 tap((category: DictionaryCategory) => {
				 	console.log(`Registered Category id=${category.id}`);
			 		if(!this._categories[ category.idDictionary ])
			 			this._categories[ category.idDictionary ] = {};
				 	this._categories[ category.idDictionary ][ category.id ] = category;
				 })
				,catchError(this.handleError<DictionaryCategory>('addCategory'))
			);
	}

	updateCategory(idDictionary:number,id:number,category): Observable<any> {
		const url = `${apiUrl}category/${idDictionary}/${id}`;
		return this.http.put<DictionaryCategory>(url, category, httpOptions)
			.pipe(
				 tap((category: DictionaryCategory) => {
				 	console.log(`Updated Category id=${category.id}`);
			 		if(!this._categories[ category.idDictionary ])
			 			this._categories[ category.idDictionary ] = {};
				 	this._categories[ category.idDictionary ][ category.id ] = category;
				 })
				,catchError(this.handleError<DictionaryCategory>('updateCategory'))
			);
	}

	deleteCategory(idDictionary:number,id): Observable<DictionaryCategory> {
		const url = `${apiUrl}category/${idDictionary}/${id}`;

		return this.http.delete<DictionaryCategory>(url, httpOptions)
			.pipe(
				 tap(_ => {
				 	console.log(`Deleted Category id=${id}`);
				 	delete this._categories[idDictionary][id];
				 })
				,catchError(this.handleError<DictionaryCategory>('deleteNovel'))
			);
	}






	_entries: object = {};

	Entries(idCategory): object {
		if(this._entries[idCategory])
			return this._entries[idCategory];
		else
			return null;
	}
	Entry(idCategory, id:number): DictionaryEntry{
		if(this._entries[idCategory])
			if(this._entries[idCategory][id])
				return this._entries[idCategory][id];
		return null;
	}
	getEntries(idCategory): Observable<{}>{
		const url = `${apiUrl}entry/${idCategory}`;

		return this.cacheService.get(
			url,
			this.http.get<{}>(url)
					.pipe(
						 tap(entries => {
						 	console.log('Fetched Category');
						 	if(entries && entries[0]){
						 		if(!this._entries[ idCategory ])
						 			this._entries[ idCategory ] = {};

								for(let i in entries){
									this._entries[ idCategory ][ entries[i].id ] = entries[i];
								}
						 	}
						 })
						,catchError(this.handleError('getCategory',[]))
			)
		)
	}

	getEntry(idCategory:number, id: number): Observable<DictionaryEntry>{
		const url = `${apiUrl}entry/${idCategory}/${id}`;
		return this.cacheService.get(
			url,
			this.http.get<DictionaryEntry>(url)
					.pipe(
						 tap(entry => {
						 	console.log(`Fetched Category id=${id}`);
						 	console.log(entry);
					 		if(!this._entries[ entry.idCategory ])
					 			this._entries[ entry.idCategory ] = {};
						 	this._entries[ entry.idCategory ][ entry.id ] = entry;
						 })
						,catchError(this.handleError<DictionaryEntry>(`getCategory id=${id}`))
					)
		);
	}

	addEntry(idCategory:number, category): Observable<DictionaryEntry> {
		const url = `${apiUrl}entry/${idCategory}`;
		return this.http.post<DictionaryEntry>(url, category, httpOptions)
			.pipe(
				 tap((category: DictionaryEntry) => {
				 	console.log(`Registered Category id=${category.id}`);
			 		if(!this._entries[ category.idCategory ])
			 			this._entries[ category.idCategory ] = {};
				 	this._entries[ category.idCategory ][ category.id ] = category;
				 })
				,catchError(this.handleError<DictionaryEntry>('addCategory'))
			);
	}

	updateEntry(idCategory:number,id:number,category): Observable<any> {
		const url = `${apiUrl}entry/${idCategory}/${id}`;
		return this.http.put<DictionaryEntry>(url, category, httpOptions)
			.pipe(
				 tap((category: DictionaryEntry) => {
				 	console.log(`Updated Category id=${category.id}`);
			 		if(!this._entries[ category.idCategory ])
			 			this._entries[ category.idCategory ] = {};
				 	this._entries[ category.idCategory ][ category.id ] = category;
				 })
				,catchError(this.handleError<DictionaryEntry>('updateCategory'))
			);
	}

	deleteEntry(idCategory:number,id): Observable<DictionaryEntry> {
		const url = `${apiUrl}entry/${idCategory}/${id}`;

		return this.http.delete<DictionaryEntry>(url, httpOptions)
			.pipe(
				 tap(_ => {
				 	console.log(`Deleted Category id=${id}`);
				 	delete this._entries[idCategory][id];
				 })
				,catchError(this.handleError<DictionaryEntry>('deleteNovel'))
			);
	}
}
