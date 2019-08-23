[//]: #@corifeus-header

 

[![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Build Status](https://api.travis-ci.com/patrikx3/corifeus-builder.svg?branch=master)](https://travis-ci.com/patrikx3/corifeus-builder) 
[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://uptimerobot.patrikx3.com/)

  
 
  
[![NPM](https://nodei.co/npm/corifeus-builder.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/corifeus-builder/)
---
# 🏗️ Corifeus Builder v2019.10.239  

  

**Bugs are evident™ - MATRIX️**  
    

### Node Version Requirement 
``` 
>=10.16.0 
```  
   
### Built on Node 
``` 
v12.8.1
```   
   
The ```async``` and ```await``` keywords are required.

Install NodeJs:    
https://nodejs.org/en/download/package-manager/    



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
```text
patrikx3@workstation ~/ramdisk/persistence/content/.p3x-ramdisk-link/Projects/patrikx3/corifeus/corifeus-builder $ grunt
Running "generate-folder" task

Running "cory-generate-tasks" task

Running "cory-npm" task

Running "clean:cory-build" (clean) task
>> 1 path cleaned.


Running "cory-replace" task
Replaced: artifacts/readme/builds/folders.md, Pre:  #@corifeus-header, Post:  #@corifeus-header:end
Replaced: artifacts/readme/builds/tasks.md, Pre:  #@corifeus-header, Post:  #@corifeus-header:end
Replaced: README.md, Pre:  #@corifeus-header, Post:  #@corifeus-header:end
Replaced: artifacts/readme/builds/folders.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end
Replaced: artifacts/readme/builds/tasks.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end
Replaced: README.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end

Done.


Execution Time (2017-05-19 11:41:05 UTC+2)
mocha_istanbul:cory-coverage  2.1s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 97%
Total 2.1s



```


# Await /  Async

Until it works for await/async, removed from **JSDoc**.


[//]: #@corifeus-footer

---

🙏 This is an open-source project. Star this repository, if you like it, or even donate to maintain the servers and the development. Thank you so much!

Possible, this server, rarely, is down, please, hang on for 15-30 minutes and the server will be back up.

All my domains ([patrikx3.com](https://patrikx3.com) and [corifeus.com](https://corifeus.com)) could have minor errors, since I am developing in my free time. However, it is usually stable.
    
**Note about versioning:** Versions are cut in Major.Minor.Patch schema. Major is always the current year. Minor is either 4 (January - June) or 10 (July - December). Patch is incremental by every build. If there is a breaking change, it should be noted in the readme.  


---
  
[**CORIFEUS-BUILDER**](https://pages.corifeus.com/corifeus-builder) Build v2019.10.239 

[![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software) 


## P3X Sponsors

[IntelliJ - The most intelligent Java IDE](https://www.jetbrains.com/?from=patrikx3)
  
[![JetBrains](https://cdn.corifeus.com/assets/svg/jetbrains-logo.svg)](https://www.jetbrains.com/?from=patrikx3) [![NoSQLBooster](https://cdn.corifeus.com/assets/png/nosqlbooster-70x70.png)](https://www.nosqlbooster.com/)

[The Smartest IDE for MongoDB](https://www.nosqlbooster.com)
  
  
 

[//]: #@corifeus-footer:end
