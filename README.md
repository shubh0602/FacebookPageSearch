# Javascript : Facebook Page Search
Searching Facebook Pages using Javascript.

### Introduction :
I created this application to search thru Facebook Pages using the graph api and select few items from the result as favourite.

### Folder Structure :
```javascript
- app
  - scripts
    - loader.js // this file will contain the funcationality of displaying loading icon when search is in progress.
    - main.js   // the application code to trigger graph api and search will reside here.
    - util.js   // utility code e.g. custom sort on Array.

```

### Prerequisites :
* Generate Access Token [here](https://developers.facebook.com/tools/accesstoken/) or follow the article from [smashballoon](https://smashballoon.com/custom-facebook-feed/access-token/)

* Goto main.js and replace your token 
```javascript
 var $accessToken = "ACCESS_CODE_HERE",
```

Run the application!

### Preview it online :
* [Demo](https://embed.plnkr.co/PB2BVJUL03egbqgwx0y3/)

* [SourceCode @Plunker](https://plnkr.co/edit/PB2BVJUL03egbqgwx0y3)
