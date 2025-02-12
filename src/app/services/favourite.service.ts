import {
    BehaviorSubject,
    catchError,
    map,
    Observable,
    of
} from 'rxjs';
import { FavouriteBlogs } from '../interfaces/favourite-blogs.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FavouriteService {
    private apiUrl = 'http://localhost:3000/favourites';
    favouritesSubject = new BehaviorSubject<FavouriteBlogs[]>([]);
    favourites$ = this.favouritesSubject.asObservable();

    constructor(private http: HttpClient) { }

    getFavourites(): Observable<FavouriteBlogs[]> {
        return this.http.get<FavouriteBlogs[]>(this.apiUrl);
    }

    addFavourite(blog: FavouriteBlogs): Observable<FavouriteBlogs> {
        return this.http.post<FavouriteBlogs>(this.apiUrl, blog);
    }

    removeFavourite(id: number): Observable<boolean> {
        return this.http.delete<FavouriteBlogs>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(error => {
                    return of(false);
                }),
                map(resp => true)
            );
    }

    isFavourite(blog: FavouriteBlogs, favourites: FavouriteBlogs[]): boolean {
        return favourites.some(fav => Number(fav.id) === blog.id);
    }
}