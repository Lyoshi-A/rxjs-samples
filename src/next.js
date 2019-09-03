import {Observable} from 'rxjs'
import {tap, map, debounceTime, distinctUntilChanged, switchMap, mergeMap, catchError, filter} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

const getPromise = value => new Promise( resolve => {
    setTimeout(()=>
        resolve(value)
    ,1500)
})

const streamA$ = Observable.create(observer=> {
    observer.next(1);
    setTimeout(()=>{observer.next(2)}, 2000)
    setTimeout(()=>{observer.next(3)}, 3000)
    setTimeout(()=>{observer.complete()}, 4000)
})

const streamB$ = streamA$.pipe(
    switchMap(value => getPromise(value))
).subscribe(v=>console.log(v))
