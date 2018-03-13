# asura

## api reference

[createObservable](src/createObservable.md)<br />

### filtering operators

[filter(predicate?)](src/filter.md)<br />
[filterBy(key, value|values)](src/filterBy.md)<br />
[distinct({ selector, comparator })](src/distinct.md)<br />
[take(count)](src/take.md)<br />
[skip(count)](src/skip.md)<br />
[at(index)](src/at.md)<br />

### transformation operators

[map(callback)](src/map.md)<br />
[scan(callback, accumulator?)](src/scan.md)<br />

### static topological operators

[merge(...sources)](src/merge.md)<br />
[mergeWith(...sources)](src/mergeWith.md)<br />
[split(choice, length?)](src/split.md)<br />
[combine(...sources)](src/combine.md)<br />
[combineWith(...sources)](src/combineWith.md)<br />
[divide(length?)](src/divide.md)<br />

### invocation

[invoke(callback)](src/invoke.md)<br />
[invokeBefore(callback)](src/invokeBefore.md)<br />
[invokeAfter(callback)](src/invokeAfter.md)<br />

### schedulers

[immediateScheduler()](src/immediateScheduler.md)<br />
[animationFrameScheduler()](src/animationFrameScheduler.md)<br />

### helpers

[assign(target, mapOrKey?);](src/assign.md)<br />
[log(prefix, { serializer });](src/log.md)<br />

