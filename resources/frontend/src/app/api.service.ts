import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { CacheService } from './cache.service';

import { Chapter } from './_models/chapter';
import { Novel } from './_models/novel';

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
}
