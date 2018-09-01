# Node Jobs Crawler

## how to use

```js
node index.js
```

open localhost:8081/index
it support pagination by appending a query e.g. localhost:8081/index?page=3

Example data

```json
{
  code: 200,
  data: [
    {
      title: "Administrative Assistant",
      href: "https://seek.com.au/job/36970152?type=promoted"
    },
    ...,
    ...,
    ...,
  ]
}

```