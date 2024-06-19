# Algorithms

The [Bun](https://bun.sh/) runtime and TS was chosen for the implementation.

In fact, the solution to this problem is built around a single function. There are at least 2 obvious solutions (except bitwise shift) - based on recursion and based on an interrupted loop.

1. [Recursion](/Utils/module.ts#L30-L37)

   ```TypeScript
   const _getCommonPrefix = (str: string, suffix: string, i = 0): string =>
     i >= str.length || i >= suffix.length || str[i] !== suffix[i]
       ? str.substring(0, i)
       : _getCommonPrefix(str, suffix, i + 1);
   ```

2. [Interrupted loop](/Utils/module.ts#L42-L49)

   ```TypeScript
   const _getCommonPrefix = (str: string, suffix: string): string => {
     let i = 0;
     do {
       i++;
     } while (i < str.length && i < suffix.length && str[i] === suffix[i]);
     return str.substring(0, i);
   };
   ```

### To run

With Docker:

```bash
docker build -f Containerfile.local -t algorithms .

docker run -it algorithms
```

With local bun runtime:

```bash
bun install

bun run main.ts
```

### Tests

```bash
bun test
```
