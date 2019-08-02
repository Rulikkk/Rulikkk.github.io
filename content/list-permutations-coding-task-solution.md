---
title: "List Permutations — Coding Task Solution"
cover: "https://unsplash.it/1152/300/?random?BirchintheRoses"
date: "2018-11-15"
category: "Education"
tags:
  - coding
  - learning
  - task
---

Task: given a string (e.g. “abc”), print out all possible permutation of its characters. There are two major variations of this task: one that goes without repetition (assume all characters are unique) or with repetition (assume some characters may repeat). In “with repetition” case, the “abb” string only has three options “abb, bab, bba”, which is important to understand.

TODO:
- add iterative solution (heap-swap idea)
- add another iterative solution (generate next permutation idea)

Implementation below has options for both cases and using multiple approaches:

```csharp
using System;
using System.Linq;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        foreach (var s in Calculate("ABBB"))
            Console.WriteLine(s);
    }

    // ЭТОТ МОЙ ЛЮБИМЫЙ == С ПОВТОРЕНИЯМИ
    public static IEnumerable<string> GeneratePermutationsWithRepitition(string arg)
    {
        var counts = arg.GroupBy(x => x).ToDictionary(g => g.Key, g => g.Count()); // calculate counts of characters
        var chars = counts.Keys.ToList(); // get unique characters
        return GenPermWithRepInternal(); // start recursion

        IEnumerable<string> GenPermWithRepInternal() // local method, has access to all variables above =)
        {
            if (chars.All(x => counts[x] == 0)) yield return string.Empty; // exit if no characters left

            foreach (var x in chars.Where(x => counts[x] > 0)) // for all remaining characters
            {                                                 // (cycle will not run, if no characters remain)
                counts[x]--; // pick char 'x' and decrease its remaining count
                foreach (var r in GenPermWithRepInternal()) // build remaining results
                    yield return x + r; // return that picked 'x' plus all following results
                counts[x]++; // put that 'x' character back for future use
            }
        }
    }

    // ЭТО СТРАННЫЙ ВАРИАНТ ПЕРЕСТАНОВК С ПОВТОРЕНИЯМИ
    public static IEnumerable<string> GeneratePermutationsWithRepitition2(string arg)
    {
        var counts = arg.GroupBy(x => x).ToDictionary(g => g.Key, g => g.Count());
        var chars = counts.Keys.ToList();
        return GenPermWithRepInternal();

        IEnumerable<string> GenPermWithRepInternal()
        {
            if (chars.All(x => counts[x] == 0)) return new [] {""};

            return chars.Where(x => counts[x] > 0).SelectMany(x =>
            {
                counts[x]--;
                var result = GenPermWithRepInternal().Select(r => x + r).ToList();
                counts[x]++;
                return result;
            });
        }
    }

    // ЭТО ВАРИАНТ СЛАВЫ =) С ПОВТОРЕНИЯМИ
    private static IEnumerable<T> ByOne<T>(T instance) {
        yield return instance;
    }

    public static IEnumerable<Tuple<char, string>> FindCases(string str) => str.Distinct().Select(e => new Tuple<char, string>(e, str.Remove(str.IndexOf(e),1)));

    private static IEnumerable<Tuple<string, string>> Calculate(string str, int n) =>
        n == 0 ?
            ByOne( new Tuple<string, string>(str, String.Empty)) :
            FindCases(str).Select(e => Calculate(e.Item2, n-1).Select(child => new Tuple<string, string>(e.Item1+child.Item1, child.Item2)) ).SelectMany(e => e);

    public static IEnumerable<string> Calculate(string str) => Calculate(str, str.Length).Select(e => e.Item1);
    // КОНЕЦ ВАРИАНТА СЛАВЫ


    // ЭТО УКОРОЧЕННЫЙ ВАРИАНТ С ИНТЕРВЬЮ
    public static IEnumerable<string> GeneratePermutations2(string tail, string head = "")
    {
        if (tail.Length == 0)
            yield return head;
        for (int i = 0; i < tail.Length; i++)
            foreach (var r in GeneratePermutations2(tail.Remove(i, 1), head + tail[i]))
                yield return r;
    }

    // ЭТОТ ВАРИАНТ МЫ ДАЛИ НА ИНТЕРВЬЮ
    /// Generate permutations of a string
    public static IEnumerable<string> GeneratePermutations(string s)
    {
        return GeneratePermutationsRecursively(s);
    }

    /// Generate permutations of a string, recursively
    private static IEnumerable<string> GeneratePermutationsRecursively(string tail, string head = "")
    {
        List<string> result = new List<string>();
        if (tail.Length == 1)
        {
            result.Add(head + tail);
            return result;
        }

        for (int i = 0; i < tail.Length; i++)
        {
            result.AddRange(GeneratePermutationsRecursively(tail.Remove(i, 1), head + tail[i]));
        }

        return result;
    }
}
```
