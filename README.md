## SCM
ssh config manager

⚠️ This command will overwrite `~/.ssh/config`,  inspection function is under development, so remember to back it up before executing this command.

### Install

First, install the package:

```
npm install -g node-scm
```

Or use yarn to install: 

```
yarn global add node-scm
```

Then, create your `scm.json` in `~/.ssh/` if not exist:

```
cat << EOF > ~/.ssh/scm.json
{
    "clients": {}
}
EOF
```

### Usage

Print help info:

```
scm -h
```

List all ssh clients:

```
scm list
```

Find one of the ssh clients:

```
scm find <host>
```

Add a ssh client:

```
scm add
```

Update one of the ssh clients:

```
scm update <host>
```

Delete one of the ssh clients:

```
scm delete <host>
```

