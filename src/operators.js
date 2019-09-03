import {interval, fromEvent} from 'rxjs'
import {map, filter, tap, take, takeLast, takeWhile, scan, reduce, switchMap} from 'rxjs/operators'


const stream5 = document.getElementById('stream5')
fromEvent(stream5, 'click')
  .pipe(
    switchMap(event => {
      return interval(200)
        .pipe(
          tap(v => console.log('Tap: ', v)),
          take(5),
          reduce((acc, v) => acc + v, 0)
        )
    })
  )
  .subscribe({
    next: v => console.log('Next: ', v),
    complete: () => console.log('Complete')
  })

// const stream$ = interval(200)
//   .pipe(
//     tap(v => console.log('Tapp: ', v)),
//     // take(5),
//     map(v => v * 3),
//     filter(v => v % 2 === 0),
//     take(10),
//     takeLast(5)
//     // takeWhile(v => v < 7)
//     // scan((acc, v) => acc + v, 0),
//     // reduce((acc, v) => acc + v, 0),
//   )
//
//
// stream$.subscribe({
//   next: v => console.log('Next: ', v),
//   complete: () => console.log('Complete')
// })
