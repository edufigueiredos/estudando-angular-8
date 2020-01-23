import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { Person } from './models/person.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, debounceTime, debounce, mergeMap, switchAll, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {

  searchInput = '';
  people$: Observable<Person[]>;
  @ViewChild('searchBy', { static: true }) searchBy: ElementRef;

  private readonly url = 'http://localhost:9000';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.firstOption();
    // this.secondOption();
    this.thirdOption();
  }

  filterPeople(searchInput: string): Observable<Person[]> {
    if (searchInput.length === 0) {
      return of([]);
    }

    return this.http.get<Person[]>(`${this.url}/${searchInput}`);
  }

  firstOption() {
    fromEvent(this.searchBy.nativeElement, 'keyup')
      .pipe(debounceTime(500))
      .subscribe(event => {
        this.people$ = this.filterPeople(this.searchInput);
      });
  }

  secondOption() {
    const keyup$ = fromEvent(this.searchBy.nativeElement, 'keyup');

    // USANDO O MERGEALL()
    // const fetch$ = keyup$.pipe(
    //   debounceTime(500),
    //   map(() => this.filterPeople(this.searchInput)),
    //   mergeAll()
    // );
    // this.people$ = fetch$;

    // USANDO O MERGEMAP()
    this.people$ = keyup$.pipe(
      debounceTime(500),
      mergeMap(() => this.filterPeople(this.searchInput))
    );
  }

  thirdOption() {
    const keyup$ = fromEvent(this.searchBy.nativeElement, 'keyup');
    // USANDO O SWITCHALL()
    // const fetch$ = keyup$.pipe(
    //   debounceTime(500),
    //   map(() => this.filterPeople(this.searchInput)),
    //   switchAll()
    // );
    // this.people$ = fetch$;

    // USANDO O SWITCHMAP()
    this.people$ = keyup$.pipe(
      debounceTime(500),
      switchMap(() => this.filterPeople(this.searchInput))
    );
  }

}
