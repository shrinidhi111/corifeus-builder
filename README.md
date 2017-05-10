[//]: #@corifeus-header

[![Build Status](https://travis-ci.org/patrikx3/corifeus-builder.svg?branch=master)](https://travis-ci.org/patrikx3/corifeus-builder)  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/corifeus-builder/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/corifeus-builder/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/corifeus-builder/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/corifeus-builder/?branch=master)  [![Trello](https://img.shields.io/badge/Trello-Corifeus-026aa7.svg)](https://trello.com/b/3NArfcD1/corifeus)

  
[![NPM](https://nodei.co/npm/corifeus-builder.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/corifeus-builder/)
------

# Corifeus Builder - Make

### Node Version Requirement 
``` >=7.8.0 ```  
   
The ```async``` and ```await``` keywords are required.

# Description


[//]: #@corifeus-header:end




To provide a global library for testing, documentation, building and a shared common library. 

It uses JS and TypeScript. It is the builder for a few ```p3x``` libs and the whole ```Corifeus Platform```. Is uses grunt / webpack / jshint / karma / protractor / angular / mocha / istanbul coverage, and a few additional helpers for building like ```json2css```, automatic ```npm versioning``` end ```file replacer``` for adding in ```build date/version, git, repo name``` etc...   


# Version
```grunt cory-npm```

Generates automated version. Major and minor is kept. Build and commit is automatic.
Major.Minor.Build-Commit

# Tasks
See [tasks](artifacts/readme/builds/tasks.md).

# Folders
[Folders](artifacts/readme/builds/folders.md) the system using.  


# Example package.json
Name is based on the ```git``` repo name, plus a prefix, so all generated. (Was ```angular-compile```, in ```NPM``` it is ```p3x-angular-compile```, also the prefix is not required, in other libs is not used like ```Corifeus```.)

```json
{
    "name": "p3x-angular-compile",
    "version": "1.1.114-203",
    "corifeus": {
        "time": "5/6/2017, 5:02:36 PM",
        "icon": "fa fa-gavel",
        "time-stamp": 1494082956181,
        "code": "Make",
        "publish": true
    }
}    
```

## Example output
```bash
patrikx3@workstation:~/Projects/patrikx3/corifeus/corifeus-builder$ grunt
Running "generate-folder" task

Running "cory-npm" task

Running "clean:cory-build" (clean) task
>> 1 path cleaned.

Running "mocha_istanbul:cory-coverage" (mocha_istanbul) task


  async/await
    ✓ main (752ms)

  src/git
commit: 237
branch: master
date: 1488495683
repo: corifeus-builder
    ✓ branch / data / commit / repo

  src/task/json2scss
    ✓ default

  src/task/npm/exec
new name: corifeus-builder
old name: corifeus-builder
new version: 1.0.238-188
old version: 1.0.238-187
    ✓ default

  src/task/replace
    ✓ default


  5 passing (796ms)

---------------------------|----------|----------|----------|----------|----------------|
File                       |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
---------------------------|----------|----------|----------|----------|----------------|
All files                  |    65.54 |    39.71 |    40.91 |    65.07 |                |
 src                       |    45.83 |    11.11 |       40 |    42.22 |                |
  Loader.js                |    16.13 |        0 |        0 |    16.13 |... 65,72,79,81 |
  git.js                   |      100 |       50 |      100 |      100 |                |
  auth-session.js                 |      100 |      100 |      100 |      100 |                |
 src/config                |      100 |      100 |      100 |      100 |                |
  auth-session.js                 |      100 |      100 |      100 |      100 |                |
 src/config/folder         |      100 |      100 |      100 |      100 |                |
  auth-session.js                 |      100 |      100 |      100 |      100 |                |
 src/config/grunt          |      100 |      100 |      100 |      100 |                |
  auth-session.js                 |      100 |      100 |      100 |      100 |                |
 src/config/grunt/angular2 |    38.89 |        0 |        0 |    38.89 |                |
  auth-session.js                 |    38.89 |        0 |        0 |    38.89 |... 5,98,99,102 |
 src/config/grunt/js       |      100 |      100 |      100 |      100 |                |
  auth-session.js                 |      100 |      100 |      100 |      100 |                |
 src/config/karma          |      100 |      100 |      100 |      100 |                |
  auth-session.js                 |      100 |      100 |      100 |      100 |                |
 src/config/karma/angular2 |    30.43 |       50 |        0 |    30.43 |                |
  config.js                |    66.67 |      100 |        0 |    66.67 |           6,43 |
  shim.js                  |    17.65 |       50 |      100 |    17.65 |... 18,21,22,24 |
 src/config/protractor     |      100 |      100 |      100 |      100 |                |
  angular2.js              |      100 |      100 |      100 |      100 |                |
 src/config/task           |       80 |       50 |      100 |       80 |                |
  auth-session.js                 |       80 |       50 |      100 |       80 |       14,15,18 |
 src/config/webpack        |    85.29 |        0 |        0 |    85.29 |                |
  common.js                |    88.89 |        0 |        0 |    88.89 |             15 |
  dev.js                   |       75 |        0 |        0 |       75 |          11,13 |
  auth-session.js                 |      100 |      100 |      100 |      100 |                |
  prod.js                  |       80 |        0 |        0 |       80 |          14,16 |
  test.js                  |      100 |      100 |      100 |      100 |                |
 src/task                  |       50 |      100 |        0 |       50 |                |
  auth-session.js                 |      100 |      100 |      100 |      100 |                |
  noop.js                  |    33.33 |      100 |        0 |    33.33 |            2,3 |
 src/task/json2scss        |    80.49 |       75 |     62.5 |    80.49 |                |
  index.js                  |    93.94 |    85.71 |      100 |    93.94 |          16,32 |
  auth-session.js                 |       25 |        0 |        0 |       25 |  4,6,7,8,10,11 |
 src/task/npm              |    72.97 |       60 |       50 |    72.22 |                |
  index.js                  |    86.21 |       60 |      100 |    85.71 |    20,21,31,40 |
  auth-session.js                 |       25 |      100 |        0 |       25 |   4,5,6,7,8,10 |
 src/task/replace          |    55.32 |       25 |       40 |    55.32 |                |
  index.js                  |    61.54 |    27.78 |    57.14 |    61.54 |... 81,83,84,88 |
  auth-session.js                 |       25 |        0 |        0 |       25 |  5,7,8,9,11,12 |
---------------------------|----------|----------|----------|----------|----------------|

=============================== Coverage summary ===============================
Statements   : 65.54% ( 194/296 )
Branches     : 39.71% ( 27/68 )
Functions    : 40.91% ( 18/44 )
Lines        : 65.07% ( 190/292 )
================================================================================
>> Done. Check coverage folder.

Running "cory-replace" task
 Replaced: artifacts/readme/builds/folders.md, Pre:  #@corifeus-header, Post:  #corifeus-header:end
 Replaced: artifacts/readme/builds/tasks.md, Pre:  #@corifeus-header, Post:  #corifeus-header:end
 Replaced: README.md, Pre:  #@corifeus-header, Post:  #corifeus-header:end
 Replaced: artifacts/readme/builds/folders.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end
 Replaced: artifacts/readme/builds/tasks.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end
 Replaced: README.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end


Done.


Execution Time (2017-03-03 12:31:03 UTC+1)
mocha_istanbul:cory-coverage  6s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 99%
Total 6.1s


```


# Await /  Async

Until it works for await/async, removed from **JSDoc**.

[//]: #@corifeus-footer

---
[**CORIFEUS-BUILDER**](https://pages.corifeus.tk/corifeus-builder) Build v1.7.503-501 on 5/6/2017, 5:02:17 PM

[Corifeus](http://github.com/patrikx3/corifeus) by [Patrik Laszlo](http://patrikx3.tk)
 

[//]: #@corifeus-footer:end