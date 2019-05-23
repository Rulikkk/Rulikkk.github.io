---
title: "Merge Sorted Lists — Coding Task Solution"
cover: "https://unsplash.it/1152/300/?random?BirchintheRoses"
date: "2019-05-22"

# note, categories should be properly capitalized
category: "Education"
tags:
    - coding
    - learning
    - task
---

Let's discuss the following task:

> Given sorted single-linked lists, merge them into one sorted single-linked list.

Sample:

    Merge(1 -> 3 -> 5 and 2 -> 4 -> 6)
    =>
    1 -> 2 -> 3 -> 4 -> 5 -> 6

# Intro

Let's define several structures, that we will need to solve the task. It will be the single-linked list node class and some of its methods:

```js
class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }

    /**
     * Append value to list and return new node
     * @param  {any} value Value to append
     * @return {Node}      Appended node
     */
    append(value) {
        this.next = new Node(value);
        return this.next;
    }

    /**
     * Print list
     */
    print() {
        let me = this,
            result = [];
        while (me) {
            result.push(me.value);
            me = me.next;
        }
        console.log(result.join(", "));
    }

    /**
     * Build list from array
     * @param  {...any} values Values to use
     * @return {Node}          Head of new list
     */
    static build(...values) {
        let root = new Node(),
            appender = (node, value) => node.append(value),
            list = values.reduce(appender, root);
        return root.next;
    }
}

let list1 = Node.build(1, 3, 5),
    list2 = Node.build(2, 4, 6),
    list3 = Node.build(0, 7, 8),
    list4 = Node.build(-1, 9, 10);

console.log("Lists to merge:");
list1.print();
list2.print();
list3.print();
list4.print();
console.log("---");
```

# Solution for Two Lists

Let's try solving the simplest variation of the problem: when there are just two lists.

The idea is simple:

-   If first element in list1 is less than first element is list2, than we take from list1.
-   If next element in list1 is still less — we take from it, otherwise from list2.
-   So, **each time we pick the smallest next element either from list1 or from list2.**
-   When one of lists is exhausted, we should just pick remaining elements from another list.

Sample:

```
Result []         lists [1, 3, 5] and [2, 4, 6]
Result [1],       lists [3, 5]    and [2, 4, 6]
Result [1, 2]     lists [3, 5]    and [4, 6]
Result [1, 2, 3]  lists [5]       and [4, 6]
...
Result [1, 2, 3, 4, 5, 6] lists [] and []; DONE;
```

Implementation:

```js
/**
 * Merge two lists, sorted asc, so that result is also sorted asc.
 * Time complexity is O(sum(len(lists))), which is linear to total length of two lists
 * Space complexity is O(1), since additional memory is not used
 * @param  {Node} list1 First list to merge
 * @param  {Node} list2 Second list to merge
 * @return {Node}       Merged list
 */
function mergeTwoLists(list1, list2) {
    // iter will be used to populate new list, result to keep its head
    let iter = (result = new Node()),
        lists = [list1, list2].filter(x => !!x); // keep only non-empty lists

    // while have non-empty lists
    while (lists.length > 0) {
        // pick list, that has min value (remember, we have only two lists!)
        let minIndex = lists[1] && lists[1].value < lists[0].value ? 1 : 0;
        // add it to answer
        iter = iter.append(lists[minIndex].value);
        // iterate that list
        lists[minIndex] = lists[minIndex].next;
        // at this point, list[minIndex] may be null, so we try to remove it
        if (!lists[minIndex]) lists.splice(minIndex, 1);
    }

    // return next from result, since result is just dummy
    return result.next;
}
```

-   The time complexity is `O(sum(len(lists)))`, which is linear to total length of two lists.
-   If all lists are of same length `L`, the complexity is `O(2 * L)`.
-   Space complexity is O(1), since additional memory is not used.

**This is a good, linear solution.** However, it does not scale to N-lists.

Another good thing, is that given this solution, it's possible to implement N-list merge:

```js
/**
 * Merge multiple lists one-by-one.
 * Time complexity: `N * len(list1) + (N-1) * len(list2) ... + len(list_N)`
 *   if all lists have same size `L`: `L * N^2` **this is not linear**
 * Space complexity: O(1)
 * @param  {...Node} lists Lists to merge
 * @return {Node}          Merged list
 */
function mergeListsNaive(...lists) {
    // merge lists to answer one-by-one
    return lists.reduce(mergeTwoLists);
}
```

-   The time complexity, if all lists are of same size, is `O(L * N^2)`. This is since we merge two lists of length `L`, then list of length `2 * L` and `L`, etc. Eventually, first list is merged `N - 1` times. This means the complexity is `(N - 1) * L + (N - 2) * L + ... + L ~ L * (N - 1) * (N - 2) / 2 ~ L * N^2`. **This is not linear anymore**.
-   Space complexity is O(1), unless intermediate lists are counted towards memory usage, which is not correct in my opinion, since they are essentially the answer.
-   Note: the time complexity of this approach highly **depends on the lists' lengths.** If they are quite different, the order of lists will affect performance.

> You can still impress the interviewer, by showing this type of solution, but it may get hard to explain its time complexity.

# N-List Merge Option1 Implementation

Let's implement the N-List merge using the same approach, as we had for two lists. This way, we may achieve a faster implementation.

```js
/**
 * Merge N lists, sorted asc, so that result is also sorted asc.
 * Time complexity is O(N*sum(len(lists))),
 * If all lists have same len `L`, this is also `L * N^2`, which is not linear
 * since each step we select the minimum index from N lists
 * Space complexity is O(1), since additional mem is not used
 * @param  {...Node} lists Lists to merge
 * @return {Node}       Merged list
 */
function mergeListsOption1(...lists) {
    // iter will be used to populater new list, result to keep its head
    let iter = (result = new Node());
    lists = lists.filter(x => !!x); // keep only non-empty lists

    function getMinIndex() {
        let index = 0;
        for (let i = lists.length - 1; i >= 1; i--) {
            if (lists[i].value < lists[index].value) index = i;
        }
        return index;
    }

    // while have non-empty lists
    while (lists.length > 0) {
        // pick list, that has min value
        let minIndex = getMinIndex();
        // add it to answer
        iter = iter.append(lists[minIndex].value);
        // iterate that list
        lists[minIndex] = lists[minIndex].next;
        // at this point, list[minIndex] may be null, so we try to remove it
        lists = lists.filter(x => !!x);
    }

    // return next from result, since result is just dummy
    return result.next;
}
```

-   The time complexity is again `O(L * N^2)` since we do `L * N` steps and select minimum using `N` steps each time.
-   Time complexity does not strongly depend on list sizes: it gets slightly better if some lists are short and exhaust fast.
-   Space complexity is still `O(1)`

Notes on implementation of `mergeListsOption1`: `getMinIndex` and `lists.filter`
both introduce a more than linear complexity, yet, we cannot avoid them.

Even in this implementation, the complexity is `L * N^2`...

# More Thinking

_Theory_: for N sorted lists, it is impossible to merge them in linear time.

_Thoughts on proof_: 

1. To merge the lists in linear time, we need to be able to select
the list, that has the next min-value in O(1). This would be possible, if the
values are already pre-sorted, and we would just pick the [0] value from some structure.
But we also need to support this structure to be sorted. This will also take some time.

2. Since the size of answer is `sum(len(lists))` which is equal to `N * L` for N lists of size L,
it is obvious, that this answer itself cannot be built faster than linear time of `O(N *  L)`. This means, that
there's only `O(1)` time remaining for picking the "next best element"—which seems impossible. This means,
that there's no algorithm, based on picking "next best element", that works in linear time. Most likely, this also
means that there cannot such an algorithm at all.

Based on ideas above, it looks like:

-   If we have constant N (number of lists), we can achieve linear time in merging the lists
-   As soon as N becomes a parameter, we loose linearity, so it cannot be solved in `O(N * L)`

# N-List Merge Heap-based Implementation

Based on thoughts above, we see, that we came to a problem of maintaining a sorted structure, that supports taking out one element, adding one element and being sorted, still.

There are multiple structures, that support it, the most simple being the Binary Heap. Let's use it here.

```js
/**
 * Merge N lists, sorted asc, so that result is also sorted asc.
 * If all lists have same len `L`, time complexity is L*N*log(N),
 * which is not linear, but good, very good
 * Space complexity is O(N), since we use heap of size N
 * @param  {...Node} lists Lists to merge
 * @return {Node}       Merged list
 */
function mergeListsFast(...lists) {
    // iter will be used to populater new list, result to keep its head
    let iter = (result = new Node());
    heap = lists.filter(x => !!x); // keep only non-empty lists

    //make heap
    function heapify(i) {
        // indexes for children
        const [l, r] = [2 * i + 1, 2 * i + 2];
        // smallest element
        let smallest = i;
        // if l is smaller
        if (l < heap.length && heap[l].value < heap[i].value) smallest = l;
        // if r is even smaller
        if (r < heap.length && heap[r].value < heap[smallest].value) smallest = r;

        // swap smallest with i
        if (smallest !== i) {
            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            // heapify again
            heapify(smallest);
        }
    }

    // heapify starting from middle of array and up to top
    for (var i = Math.floor(heap.length / 2); i >= 0; i--) heapify(i);

    // while have non-empty lists
    while (heap[0]) {
        // add min node to answer
        iter = iter.append(heap[0].value);
        // iterate that list
        heap[0] = heap[0].next;
        // at this point, heap[0] may be null, so we try to remove it
        if (!heap[0]) heap[0] = heap.pop();
        // then we rebuild the heap (this is Log(N))
        heapify(0);
    }

    // return next from result, since result is just dummy
    return result.next;
}
```

This problem could be approached as "sort N lists of L elements". In that case,
the naive complexity would be a quicksort of `N * L` elements, which is `N * L * log(N * L)` time complexity, and would take `N * L` additional space for intermediate array.
Our fast Heap-based approach is even better then this, in terms of time and space, so I consider it pretty optimal.

# Fast Two-List-Merge-based Approach

Let's revisit our two-list-merge-based implmenentation for N-lists.

We can improve it, by merging "pairs" of lists. E.g. if merging lists is "+" we could improve it from using `N - 1` operations to merge N lists, to using following **tree-like approach**:

    list1 + list2 + list3 + list4 + list5 + list6 + list7 + list8 =
    list1+list2 = list12
                         + ... = list1234
    list3+list4 = list34
                                          +... = list12345678
    list5+list6 = list56
                         + ... = list5678
    list7+list8 = list78

```js
/**
 * Merge N lists, sorted asc, so that result is also sorted asc.
 * If all lists have same len `L`, time complexity is L*N*log(N),
 * which is not linear, but good, very good
 * Space complexity is O(1), since we don't use additional space
 * @param  {...Node} lists Lists to merge
 * @return {Node}       Merged list
 */
function mergeListsFast2(...lists) {
    let end = lists.length - 1;
    while (end > 0) {
        let [i, j] = [0, end];
        while (i < j) {
            lists[i] = mergeTwoLists(lists[i++], lists[j--]);
        }
        end = j;
    }
    return lists[0];
}
```

-   Time complexity is `O(L * N * log(N))`, since on each stage we merge a total of `L * N` items in lists. We do `log(N)` steps of this (height of B-tree).
-   Space complexity is `O(1)`, unless we count intermediate answers as space, which I don't think we should do.
-   If the lengths of lists are not even, the order of lists affects performance and may degrade it dramatically.

# Conclusion

Now we know multiple approaches to solving this generic task, ones that are optimal, and which are not. I think the best and simplest approach is to implement merge for two lists, and then construct tree-based merge from it (which is `mergeListsFast2` here). However, if you care about case for non-even lists' lengths—think about the heap-based approach, which seems to be a more stable bet in "general case".

Notes:

-   It looks so interesting, that as soon as we have N-lists, the solution becomes non-linear;
-   It is surprising, that there is an optimal solution, that uses `mergeTwoLists` as a basis, and is short to code, and uses less memory, than any other solution;
-   It is also cool, that several sub-optimal and quite different solutions provide same time-estimate;
