# Idea

## Boilerplate

For **pnpm** monorepo with

- [ ] Front-End project: React.js
- [ ] Back-End project: Node.js
- [x] Common Libraries project: A separate, reusable project or JavaScript module, but is used in the Front-End and in the Back-End projects as well.

Other dependencies

- debug (logging) megnézni, terheli e a kódot, v buildnél kikapcsolható-e.
- ajv (another json-schema validator)

Dev dependencies

- esbuild
- jest
- eslint
- prettier

# ToDos

- [ ] Preiodically recheck [my reported issue](https://github.com/charlieduong94/interface-js/issues/14). If accepted and fixed, the "interface-js" package can be removed from the monorepo and replaced with importing the `charlieduong94/interface-js` instead.
- [ ] Correctly set the esbuild "--external:xxx" parameter
- [ ] pnpm upgrade esbuild-jest (remove deprecated libs)
- [ ] Prettier és Eslint munkamegosztást rendberakni (amit lehet áttenni prettier-be, h automatikusan formázzon is, vagy eslint-et bekonfigolni, h az formázzon is a mentéskor.)
- [ ] Az egyes modulokhoz JSDoc kódokat írni
- [ ] Eldönteni, h kell-e és ha igen akkor hogyan a
  - [ ] [`dotenv`](https://github.com/motdotla/dotenv) package (devDependency vagy sima dependency?)
  - [ ] [`debug-js`](https://www.npmjs.com/package/debug) package
  - [ ] [`esbuild-plugin-ifdef`](https://github.com/Jarred-Sumner/esbuild-plugin-ifdef) package

# testing markdown features

| Syntax    | Description             |
| --------- | ----------------------- |
| Header    | Title that is very long |
| Paragraph | Text                    |

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}

class Queue {
  constructor() {}
}
```

- [ ] Write the press release
- [ ] Update the website
- [ ] Contact the media

That is so funny! :joy:

I need to highlight these ==very important words==.

H~2~O

X^2^
