import {Subject, BehaviorSubject, ReplaySubject} from 'rxjs'

const subject = document.getElementById('stream1')
subject.addEventListener('click', () => {

  const stream$ = new ReplaySubject(6)


  stream$.next('Hello')
  stream$.next('Rx')
  stream$.next('JS')
  stream$.next('JSX')
  stream$.next('TSX')
  stream$.subscribe(v => console.log('Value: ', v))

})
