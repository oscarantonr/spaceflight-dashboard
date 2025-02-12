import { BehaviorSubject, map, Observable } from 'rxjs';
import { Blog, Blogs } from '../interfaces/blogs-interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpaceflightDataService {

    private http = inject(HttpClient);
    private searchResultsSubject = new BehaviorSubject<Blogs | null>(null);
    searchResults$ = this.searchResultsSubject.asObservable();

    constructor() { }

    getBlogs(): Observable<Blog[]> {
        return this.http.get<Blogs>('https://api.spaceflightnewsapi.net/v4/blogs')
            .pipe(
                map(data => data.results)
            )

    }

    getBlogById(id: number) {
        return this.http.get<Blog>(`https://api.spaceflightnewsapi.net/v4/blogs/${id}`)
            .pipe(
                map(data => data)
            )
    }

    searchByWords(words: string) {
        return this.http.get<Blogs>(`https://api.spaceflightnewsapi.net/v4/blogs/?search=${words}`)
            .pipe(
                map(data => {
                    this.searchResultsSubject.next(data);
                    return data;
                })
            )
    }

}