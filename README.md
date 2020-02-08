# SCM

ssh config manager with database, support sqlite3 or mysql.

## Install

```bash
# use npm
npm install -g node-scm
# use yarn
yarn global add node-scm
```

## Changed Files

+ `~/.ssh/config` : Will add `Include scm_config` to the end of file if not exist.
+ `~/.ssh/scm_config` : Generated ssh config, included by `~/.ssh/config`.
+ `~/.ssh/scm_sql_application.json`： It will be created automatically the first time.
+ `~/.ssh/scm.sqlite`: If you use `sqlite` mode.

## Switch Database

You can switch between `mysql` and `sqlite`, just edit `~/.ssh/scm_sql_application.json`.

```
{
  "sqlite": {
    "type": "sqlite",
    "database": "~/.ssh/scm.sqlite", # sqlite file
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "synchronize": true
  },
  "mysql": {
    "type": "mysql",
    "host": "127.0.0.1", # mysql host
    "port": 3306, # mysql port
    "username": "root", # mysql username
    "password": "1111", # mysql password
    "database": "scm",
    "entities": ["dist/**/**.entity{.ts,.js}"],
    "synchronize": true
  },
  "use": "sqlite" # switch between "mysql" and "sqlite"
}
```

## Usage

+ Print help info:

  ```
  > scm -h
  Usage: scm <command> [options]
  
  命令：
    scm add     Add a ssh client.
    scm delete  Delete one of the ssh client.
    scm get     Get one of the ssh clients.
    scm list    List all ssh clients.
    scm search  Search by keywords.
    scm update  Update one of the ssh client.
    scm import  Import config from old node-scm.
  ```

+ List all ssh clients:

  ```
  scm list  # list all
  scm list -d # list deleted ssh clients
  scm list -c <category> # list ssh clients in the specified category
  scm list -h # print help info
  ```

+ Delete the ssh client:

  ```
  scm delete -a <alias> # delete ssh client
  scm delete -h # print help info
  ```

+ Get one of ssh clients:

  ```
  scm get -a <alias> # get ssh client
  scm get -h # print help info
  ```

+ Search by keyword:

  ```
  scm search -k <keyword> # use * to match any character
  e.g. scm search -k *server # list all ssh keywords end with 'server'
  scm search -h # print help info
  ```

+ Add ssh client:

  ```
  # if both 'alias' and 'server' exist, it will be saved directly, otherwise enter interactive mode.
  scm add [-a <alias>] [-s <server>] [-u <user>] [-p <port>] [-c <category>]
  scm add -h # print help info
  ```

+ Update ssh client:

  ```
  # if one of [rename, server, user, port, category] exist, it will be saved directly, otherwise enter interactive mode.
  scm update -a <alias> [-r <rename>] [-s <server>] [-u <user>] [-p <port>] [-c <category>]
  scm update -h # print help info
  ```

+ Import old version config.

  ```
  # if you use an old version node-scm, you can import data to new version. 
  # default path is `~/.ssh/scm.json`
  scm import [--path <path>] 
  ```

## Notice

Since `Include scm_config` is at the end of `~/.ssh/config`, `Host` defined in `~/.ssh/scm_config` will be overwritten by the `Host` before `Include scm_config`.