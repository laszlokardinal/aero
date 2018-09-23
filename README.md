# asura

## api reference

[createObservable](src/createObservable.md)<br />

### sources

[tick(scheduler, { start$, stop$ })](src/tick.md)<br />

### filtering operators

[filter(predicate?)](src/filter.md)<br />
[filterBy(key, value|values)](src/filterBy.md)<br />
[distinct({ selector, comparator })](src/distinct.md)<br />
[take(count)](src/take.md)<br />
[skip(count)](src/skip.md)<br />
[at(index)](src/at.md)<br />

### transformation operators

[map(callback)](src/map.md)<br />
[select(callback)](src/select.md)<br />
[scan(callback, accumulator?)](src/scan.md)<br />

### static topological operators

[merge(...sources)](src/merge.md)<br />
[mergeWith(...sources)](src/mergeWith.md)<br />
[split(choice, length?)](src/split.md)<br />
[combine(...sources)](src/combine.md)<br />
[combineWith(...sources)](src/combineWith.md)<br />
[divide(length?)](src/divide.md)<br />

### dynamic topological operators

[fork(predicate, callback)](src/fork.md)<br />
[forkBy(forkSource, callback)](src/forkBy.md)<br />
[gate(choice, initialState?)](src/gate.md)<br />
[gateBy(onSource, offSource, initialState?)](src/gateBy.md)<br />
[detach(choice)](src/detach.md)<br />
[detachBy(detachSource, predicate)](src/detachBy.md)<br />

### timing operators

[delay(timeInMs)](src/delay.md)<br />
[debounce(timeInMs)](src/debounce.md)<br />
[throttle(scheduler)](src/throttle.md)<br />
[buffer(scheduler)](src/buffer.md)<br />

### function invocation operators

[invoke(callback)](src/invoke.md)<br />
[invokeBefore(callback)](src/invokeBefore.md)<br />
[invokeAfter(callback)](src/invokeAfter.md)<br />

### schedulers

[immediateScheduler()](src/immediateScheduler.md)<br />
[intervalScheduler(timeInMs)](src/intervalScheduler.md)<br />
[animationFrameScheduler()](src/animationFrameScheduler.md)<br />

### helpers

[assign(target, mapOrKey?);](src/assign.md)<br />
[log(prefix, { serializer });](src/log.md)<br />

### operator composition

[join(operators)](src/join.md)<br />
[arrange(operators)](src/arrange.md)<br />
[interconnect(operators)](src/interconnect.md)<br />
