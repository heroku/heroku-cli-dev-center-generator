---
title: Heroku CLI Commands
id: 4088




## Introduction
These are the help texts for each of the core Heroku CLI commands. You can also see this text in your terminal with `heroku help `, `heroku --help`, or `heroku -h`.



Commands
========

## 2fa

### `heroku 2fa`

*check 2fa status*


[(top)](#table-of-contents)


### `heroku 2fa:disable`

*disable 2fa on account*


[(top)](#table-of-contents)


### `heroku 2fa:generate-recovery-codes`

*generates and replaces recovery codes*


[(top)](#table-of-contents)


## access

### `heroku access`

*list who has access to an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku access:add EMAIL`

*add new users to your app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--permissions`|list of permissions comma separated|
||`--privileges`||

#### Examples:

```term
heroku access:add user@email.com --app APP # Add a collaborator to your app
heroku access:add user@email.com --app APP --permissions deploy,manage,operate # permissions must be comma separated
```


[(top)](#table-of-contents)


### `heroku access:remove EMAIL`

*remove users from your app*

#### Example:

```term
heroku access:remove user@email.com --app APP
```


[(top)](#table-of-contents)


### `heroku access:update EMAIL`

*update existing collaborators in an org app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--permissions`|comma-delimited list of permissions to update (deploy,manage,operate)|
||`--privileges`||

#### Example:

```term
heroku access:update user@email.com --app APP --privileges deploy,manage,operate
```


[(top)](#table-of-contents)


## addons

### Overview of Add-ons:

Add-ons are created with the `addons:create` command, providing a reference
to an add-on service (such as `heroku-postgresql`) or a service and plan
(such as `heroku-postgresql:hobby-dev`).

At creation, each add-on is given a globally unique name. In addition, each
add-on has at least one attachment alias to each application which uses the
add-on. In all cases, the owning application will be attached to the add-on.
An attachment alias is unique to its application, and is used as a prefix to
any environment variables it exports to the application.

In this example, a `heroku-postgresql` add-on is created and its given name
is `postgresql-deep-6913` with a default attachment alias of `DATABASE`:

```term
$ heroku addons:create heroku-postgresql --app my-app
Creating postgresql-deep-6913... done, (free)
Adding postgresql-deep-6913 to my-app... done
Setting DATABASE_URL and restarting my-app... done, v5
Database has been created and is available

$ heroku addons --app my-app
Add-on                                     Plan       Price
─────────────────────────────────────────  ─────────  ─────
heroku-postgresql (postgresql-deep-6913)   hobby-dev  free
└─ as DATABASE
```

The add-on name and, in some cases, the attachment alias can be specified by
the user. For instance, we can add a second database to the app, specifying
both these identifiers:

```term
$ heroku addons:create heroku-postgresql --app my-app --name main-db --as PRIMARY_DB
Creating main-db... done, (free)
Adding main-db to my-app... done
Setting PRIMARY_DB_URL and restarting my-app... done, v6
Database has been created and is available

$ heroku addons --app my-app
Add-on                                     Plan       Price
─────────────────────────────────────────  ─────────  ─────
heroku-postgresql (main-db)                hobby-dev  free
└─ as PRIMARY_DB

heroku-postgresql (postgresql-deep-6913)   hobby-dev  free
└─ as DATABASE
```

Attachment aliases can also be specified when making attachments:

```term
$ heroku addons:attach main-db --app my-app --as ANOTHER_NAME
Attaching main-db as ANOTHER_NAME to my-app... done
Setting ANOTHER_NAME vars and restarting my-app... done, v7

$ heroku addons --app my-app
Add-on                                     Plan       Price
─────────────────────────────────────────  ─────────  ─────
heroku-postgresql (main-db)                hobby-dev  free
├─ as PRIMARY_DB
└─ as ANOTHER_NAME

heroku-postgresql (postgresql-deep-6913)   hobby-dev  free
└─ as DATABASE
```

For more information, read [https://devcenter.heroku.com/articles/add-ons](https://devcenter.heroku.com/articles/add-ons).

### `heroku addons`

*lists your add-ons and attachments*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-A`|`--all`|show add-ons and attachments for all accessible apps|
||`--json`|return add-ons in json format|

The default filter applied depends on whether you are in a Heroku app
directory. If so, the --app flag is implied. If not, the default of --all
is implied. Explicitly providing either flag overrides the default
behavior.
#### Examples:

```term
$ heroku addons --all
$ heroku addons --app acme-inc-www

```


[(top)](#table-of-contents)



### `heroku addons:attach ADDON_NAME`

*attach add-on resource to a new app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--as`|name for add-on attachment|
||`--confirm`|overwrite existing add-on attachment with same name|
||`--credential`|credential name for scoped access to Heroku Postgres|


[(top)](#table-of-contents)


### `heroku addons:create SERVICE:PLAN`

*create an add-on resource*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--as`|name for the initial add-on attachment|
||`--confirm`|overwrite existing config vars or existing add-on attachments|
||`--name`|name for the add-on resource|
||`--wait`|watch add-on creation status and exit when complete|


[(top)](#table-of-contents)


### `heroku addons:destroy`

*destroy add-on resources*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||
|`-f`|`--force`|allow destruction even if connected to other apps|


[(top)](#table-of-contents)


### `heroku addons:detach ATTACHMENT_NAME`

*detach an add-on resource from an app*


[(top)](#table-of-contents)


### `heroku addons:docs ADDON`

*open an add-on's Dev Center documentation in your browser*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--show-url`|show URL, do not open browser|


[(top)](#table-of-contents)


### `heroku addons:downgrade ADDON [PLAN]`

*change add-on plan*


See available plans with `heroku addons:plans SERVICE`.

Note that `heroku addons:upgrade` and `heroku addons:downgrade` are the same.
Either one can be used to change an add-on plan up or down.

[https://devcenter.heroku.com/articles/managing-add-ons](https://devcenter.heroku.com/articles/managing-add-ons)
#### Examples:

Upgrade an add-on by service name:

```term
$ heroku addons:upgrade heroku-redis:premium-2
```

Upgrade a specific add-on:

```term
$ heroku addons:upgrade swimming-briskly-123 heroku-redis:premium-2
```


[(top)](#table-of-contents)


### `heroku addons:info ADDON`

*show info about an add-on and its attachments*


[(top)](#table-of-contents)


### `heroku addons:open ADDON`

*open an add-on's dashboard in your browser*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--show-url`|show URL, do not open browser|


[(top)](#table-of-contents)


### `heroku addons:plans SERVICE`

*list all available plans for an add-on services*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)



### `heroku addons:rename ADDON NAME`

*rename an add-on*


[(top)](#table-of-contents)


### `heroku addons:services`

*list all available add-on services*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku addons:upgrade ADDON [PLAN]`

*change add-on plan*


See available plans with `heroku addons:plans SERVICE`.

Note that `heroku addons:upgrade` and `heroku addons:downgrade` are the same.
Either one can be used to change an add-on plan up or down.

[https://devcenter.heroku.com/articles/managing-add-ons](https://devcenter.heroku.com/articles/managing-add-ons)
#### Examples:

Upgrade an add-on by service name:

```term
$ heroku addons:upgrade heroku-redis:premium-2
```

Upgrade a specific add-on:

```term
$ heroku addons:upgrade swimming-briskly-123 heroku-redis:premium-2
```


[(top)](#table-of-contents)


### `heroku addons:wait [ADDON]`

*show provisioning status of the add-ons on the app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--wait-interval`|how frequently to poll in seconds|


[(top)](#table-of-contents)


## apps

### `heroku apps`

*list your apps*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-A`|`--all`|include apps in all teams|
|`-p`|`--personal`|list apps in personal account when a default team is set|
|`-s`|`--space`|filter by space|
|`-t`|`--team`|team to use|
||`--json`|output in json format|

#### Example:

```term
$ heroku apps
=== My Apps
example
example2

=== Collaborated Apps
theirapp   other@owner.name
```


[(top)](#table-of-contents)


### `heroku apps:create [APP]`

*creates a new app*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-a`|`--app`||
|`-b`|`--buildpack`|buildpack url to use for this app|
|`-n`|`--no-remote`|do not create a git remote|
|`-r`|`--remote`|the git remote to create, default "heroku"|
|`-s`|`--stack`|the stack to create the app on|
|`-t`|`--team`|team to use|
||`--addons`|comma-delimited list of addons to install|
||`--kernel`||
||`--locked`||
||`--region`|specify region for the app to run in|
||`--space`|the private space to create the app in|
||`--ssh-git`|use SSH git protocol for local git remote|

#### Examples:

```term
$ heroku apps:create
Creating app... done, stack is cedar-14
https://floating-dragon-42.heroku.com/ | https://git.heroku.com/floating-dragon-42.git

# or just
$ heroku create

# specify a buildpack
$ heroku apps:create --buildpack https://github.com/some/buildpack.git

# specify a name
$ heroku apps:create example

# create a staging app
$ heroku apps:create example-staging --remote staging

# create an app in the eu region
$ heroku apps:create --region eu
```


[(top)](#table-of-contents)



### `heroku apps:destroy [APP]`

*permanently destroy an app*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||

This will also destroy all add-ons on the app.

[(top)](#table-of-contents)


### `heroku apps:errors`

*view app errors*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--dyno`|show only dyno errors|
||`--hours`|number of hours to look back (default 24)|
||`--json`|output in json format|
||`--router`|show only router errors|


[(top)](#table-of-contents)


### `heroku apps:favorites`

*list favorited apps*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku apps:favorites:add`

*favorites an app*


[(top)](#table-of-contents)


### `heroku apps:favorites:remove`

*unfavorites an app*


[(top)](#table-of-contents)



### `heroku apps:info [APP]`

*show detailed app information*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-j`|`--json`||
|`-s`|`--shell`|output more shell friendly key/value pairs|
|`-x`|`--extended`||

#### Examples:

```term
$ heroku apps:info
=== example
Git URL:   https://git.heroku.com/example.git
Repo Size: 5M
...

$ heroku apps:info --shell
git_url=https://git.heroku.com/example.git
repo_size=5000000
...
```


[(top)](#table-of-contents)


### `heroku apps:join`

*add yourself to an organization app*


[(top)](#table-of-contents)


### `heroku apps:leave`

*remove yourself from an organization app*


[(top)](#table-of-contents)



### `heroku apps:lock`

*prevent organization members from joining an app*


[(top)](#table-of-contents)


### `heroku apps:open [PATH]`

*open the app in a web browser*

#### Examples:

```term
$ heroku open -a myapp
# opens https://myapp.herokuapp.com

$ heroku open -a myapp /foo
# opens https://myapp.herokuapp.com/foo
```


[(top)](#table-of-contents)


### `heroku apps:rename NEWNAME`

*rename an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--ssh-git`|use ssh git protocol instead of https|


This will locally update the git remote if it is set to the old app.
#### Example:

```term
$ heroku apps:rename --app oldname newname
https://newname.herokuapp.com/ | https://git.heroku.com/newname.git
Git remote heroku updated
```


[(top)](#table-of-contents)


### `heroku apps:stacks`

*show the list of available stacks*


[(top)](#table-of-contents)


### `heroku apps:stacks:set STACK`

*set the stack of an app*

#### Example:

```term
$ heroku stack:set cedar-14 -a myapp
Stack set. Next release on myapp will use cedar-14.
Run git push heroku master to create a new release on myapp.
```


[(top)](#table-of-contents)


### `heroku apps:transfer RECIPIENT`

*transfer applications to another user, organization or team*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-l`|`--locked`|lock the app upon transfer|
||`--bulk`|transfer applications in bulk|

#### Examples:

```term
$ heroku apps:transfer collaborator@example.com
Transferring example to collaborator@example.com... done

$ heroku apps:transfer acme-widgets
Transferring example to acme-widgets... done

$ heroku apps:transfer --bulk acme-widgets
...
```


[(top)](#table-of-contents)


### `heroku apps:unlock`

*unlock an app so any organization member can join*


[(top)](#table-of-contents)


## auth

### `heroku auth:2fa`

*check 2fa status*


[(top)](#table-of-contents)


### `heroku auth:2fa:disable`

*disable 2fa on account*


[(top)](#table-of-contents)


### `heroku auth:2fa:generate`

*generates and replaces recovery codes*


[(top)](#table-of-contents)


### `heroku auth:login`

*login with your Heroku credentials*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-e`|`--expires-in`|duration of token in seconds|
||`--sso`|login for enterprise users under SSO|


[(top)](#table-of-contents)


### `heroku auth:logout`

*display the current logged in user*


[(top)](#table-of-contents)


### `heroku auth:token`

*display the current auth token*


[(top)](#table-of-contents)


### `heroku auth:whoami`

*display the current logged in user*


[(top)](#table-of-contents)


## authorizations

### `heroku authorizations`

*list OAuth authorizations*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku authorizations:create`

*create a new OAuth authorization*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--description`|set a custom authorization description|
|`-e`|`--expires-in`|set expiration in seconds|
|`-s`|`--scope`|set custom OAuth scopes|
||`--json`|output in json format|
||`--short`|only output token|

This creates an authorization with access to your Heroku account.

[(top)](#table-of-contents)


### `heroku authorizations:info ID`

*show an existing OAuth authorization*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku authorizations:revoke ID`

*revoke OAuth authorization*


[(top)](#table-of-contents)


### `heroku authorizations:update ID`

*updates an OAuth authorization*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--description`|set a custom authorization description|
||`--client-id`|identifier of OAuth client to set|
||`--client-secret`|secret of OAuth client to set|


[(top)](#table-of-contents)


## buildpacks

### `heroku buildpacks`

*display the buildpack_url(s) for an app*


```term
$ heroku buildpacks
```


[(top)](#table-of-contents)


### `heroku buildpacks:add URL`

*add new app buildpack, inserting into list of buildpacks if necessary*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-i`|`--index`|the 1-based index of the URL in the list of URLs|

#### Example:

```term
$ heroku buildpacks:add -i 1 https://github.com/heroku/heroku-buildpack-ruby
```


[(top)](#table-of-contents)


### `heroku buildpacks:clear`

*clear all buildpacks set on the app*


[(top)](#table-of-contents)


### `heroku buildpacks:remove [URL]`

*remove a buildpack set on the app*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-i`|`--index`|the 1-based index of the URL to remove from the list of URLs|


[(top)](#table-of-contents)


### `heroku buildpacks:set URL`

*set new app buildpack, overwriting into list of buildpacks if necessary*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-i`|`--index`|the 1-based index of the URL in the list of URLs|

#### Example:

```term
$ heroku buildpacks:set -i 1 heroku/ruby
```


[(top)](#table-of-contents)


## certs

### `heroku certs`

*list SSL certificates for an app*


[(top)](#table-of-contents)


### `heroku certs:add CRT KEY`

*add an SSL certificate to an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--bypass`|bypass the trust chain completion step|
||`--domains`|domains to create after certificate upload|
||`--type`|type to create, either 'sni' or 'endpoint'|

Note: certificates with PEM encoding are also valid
#### Example:

```term
$ heroku certs:add example.com.crt example.com.key
```
#### Example (Certificate Intermediary):

```term
$ heroku certs:add intermediary.crt example.com.crt example.com.key
```


[(top)](#table-of-contents)


### `heroku certs:auto`

*show ACM status for an app*


[(top)](#table-of-contents)


### `heroku certs:auto:disable`

*disable Automatic Certificate Management for an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--confirm`||


[(top)](#table-of-contents)


### `heroku certs:auto:enable`

*enable ACM status for an app*


[(top)](#table-of-contents)


### `heroku certs:auto:refresh`

*refresh ACM for an app*


[(top)](#table-of-contents)


### `heroku certs:chain`

*print an ordered & complete chain for a certificate*


[(top)](#table-of-contents)


### `heroku certs:generate DOMAIN`

*generate a key and a CSR or self-signed certificate*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--area`|sub-country area (state, province, etc.) of owner|
||`--city`|city of owner|
||`--country`|country of owner, as a two-letter ISO country code|
||`--keysize`|RSA key size in bits (default: 2048)|
||`--now`|do not prompt for any owner information|
||`--owner`|name of organization certificate belongs to|
||`--selfsigned`|generate a self-signed certificate instead of a CSR|
||`--subject`|specify entire certificate subject|

Generate a key and certificate signing request (or self-signed certificate)
for an app. Prompts for information to put in the certificate unless --now
is used, or at least one of the --subject, --owner, --country, --area, or
--city options is specified.
#### Example:

```term
$ heroku certs:generate example.com
```


[(top)](#table-of-contents)


### `heroku certs:info`

*show certificate information for an SSL certificate*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--endpoint`|endpoint to check info on|
||`--name`|name to check info on|


[(top)](#table-of-contents)


### `heroku certs:key`

*print the correct key for the given certificate*

You must pass one single certificate, and one or more keys.
The first key that signs the certificate will be printed back.
#### Example:

```term
$ heroku certs:key example.com.crt example.com.key
```


[(top)](#table-of-contents)


### `heroku certs:remove`

*remove an SSL certificate from an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--confirm`||
||`--endpoint`|endpoint to remove|
||`--name`|name to remove|


[(top)](#table-of-contents)


### `heroku certs:rollback`

*rollback an SSL certificate from an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--confirm`||
||`--endpoint`|endpoint to rollback|
||`--name`|name to rollback|


[(top)](#table-of-contents)


### `heroku certs:update CRT KEY`

*update an SSL certificate on an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--bypass`|bypass the trust chain completion step|
||`--confirm`||
||`--endpoint`|endpoint to update|
||`--name`|name to update|

Note: certificates with PEM encoding are also valid
#### Example:

```term
$ heroku certs:update example.com.crt example.com.key
```
#### Example (Certificate Intermediary) :

```term
$ heroku certs:update intermediary.crt example.com.crt example.com.key
```


[(top)](#table-of-contents)


## ci

### `heroku ci`

*show the most recent runs*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-w`|`--watch`|keep running and watch for new and update tests|

display the most recent CI runs for the given pipeline

[(top)](#table-of-contents)


### `heroku ci:config`

*display CI config vars*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|
|`-s`|`--shell`|output config vars in shell format|
||`--json`|output config vars in json format|


[(top)](#table-of-contents)


### `heroku ci:config:get KEY`

*get a CI config var*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|
|`-s`|`--shell`|output config var in shell format|

#### Examples:

```term
$ heroku ci:config:get RAILS_ENV
test
```


[(top)](#table-of-contents)


### `heroku ci:config:set`

*set CI config vars*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|

#### Examples:

```term
$ heroku ci:config:set RAILS_ENV=test
Setting test config vars... done

RAILS_ENV: test
```


[(top)](#table-of-contents)


### `heroku ci:config:unset`

*unset CI config vars*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|

#### Examples:

```term
$ heroku ci:config:uset RAILS_ENV
Unsetting RAILS_ENV... done
```


[(top)](#table-of-contents)


### `heroku ci:debug`

*opens an interactive test debugging session with the contents of the current directory*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|
|`-s`|`--size`|dyno size|
||`--no-setup`|start test dyno without running test-setup|

#### Example:


```term
Preparing source... done
Creating test run... done
Running setup and attaching to test dyno...

~ $
```


[(top)](#table-of-contents)


### `heroku ci:info NUMBER`

*test run information*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|

show the status of a specific test run

[(top)](#table-of-contents)


### `heroku ci:last`

*get the results of the last run*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|

looks for the most recent run and returns the output of that run

[(top)](#table-of-contents)



### `heroku ci:migrate-manifest`

*app-ci.json is deprecated. Run this command to migrate to app.json with an environments key*

#### Example:

```term
$ heroku ci:migrate-manifest
Writing app.json file... done
Deleting app-ci.json file... done
Please check the contents of your app.json before committing to your repo
You're all set! 🎉.
```


[(top)](#table-of-contents)


### `heroku ci:open`

*open the Dashboard version of Heroku CI*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|

opens a browser to view the Dashboard version of Heroku CI

[(top)](#table-of-contents)


### `heroku ci:rerun [NUMBER]`

*rerun tests against current directory*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|

uploads the contents of the current directory, using git archive, to Heroku and runs the tests

[(top)](#table-of-contents)


### `heroku ci:run`

*run tests against current directory*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pipeline`|pipeline|

uploads the contents of the current directory to Heroku and runs the tests

[(top)](#table-of-contents)


## clients

### `heroku clients`

*list your OAuth clients*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku clients:create NAME REDIRECT_URI`

*create a new OAuth client*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--shell`|output in shell format|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku clients:destroy ID`

*delete client by ID*


[(top)](#table-of-contents)


### `heroku clients:info ID`

*show details of an oauth client*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--shell`|output in shell format|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku clients:update ID`

*(sudo) update OAuth client*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-n`|`--name`|change the client name|
||`--url`|change the client redirect URL|


[(top)](#table-of-contents)


## config

### `heroku config`

*display the config vars for an app*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--shell`|output config vars in shell format|
||`--json`|output config vars in json format|


[(top)](#table-of-contents)



### `heroku config:get KEY`

*display a config value for an app*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--shell`|output config var in shell format|

#### Example:

```term
$ heroku config:get RAILS_ENV
production
```


[(top)](#table-of-contents)



### `heroku config:set`

*set one or more config vars*

#### Examples:

```term
$ heroku config:set RAILS_ENV=staging
Setting config vars and restarting example... done, v10
RAILS_ENV: staging

$ heroku config:set RAILS_ENV=staging RACK_ENV=staging
Setting config vars and restarting example... done, v11
RAILS_ENV: staging
RACK_ENV:  staging
```


[(top)](#table-of-contents)


### `heroku config:unset`

*unset one or more config vars*

#### Examples:

```term
$ heroku config:unset RAILS_ENV
Unsetting RAILS_ENV and restarting example... done, v10

$ heroku config:unset RAILS_ENV RACK_ENV
Unsetting RAILS_ENV, RACK_ENV and restarting example... done, v10
```


[(top)](#table-of-contents)


## domains

### `heroku domains`

*list domains for an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|

#### Example:

```term
$ heroku domains
=== example Heroku Domain
example.herokuapp.com

=== example Custom Domains
Domain Name  DNS Target
───────────  ─────────────────────
example.com  example.herokuapp.com
```


[(top)](#table-of-contents)


### `heroku domains:add HOSTNAME`

*add domain to an app*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--wait`||


[(top)](#table-of-contents)


### `heroku domains:clear`

*remove all domains from an app*


[(top)](#table-of-contents)


### `heroku domains:remove HOSTNAME`

*remove domain from an app*


[(top)](#table-of-contents)


### `heroku domains:wait [HOSTNAME]`

*wait for domain to be active for an app*


[(top)](#table-of-contents)


## drains

### `heroku drains`

*display the log drains of an app*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-x`|`--extended`||
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku drains:add URL`

*adds a log drain to an app*


[(top)](#table-of-contents)



### `heroku drains:remove URL`

*removes a log drain from an app*


[(top)](#table-of-contents)



## dyno

### `heroku dyno:copy FILE`

*copy a file from a dyno to the local filesystem*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|specify the dyno to connect to|
|`-o`|`--output`|the name of the output file|


```term

$ heroku dyno:copy FILENAME
```


[(top)](#table-of-contents)


### `heroku dyno:exec`

*create an SSH session to a dyno*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|specify the dyno to connect to|
||`--ssh`|use native ssh|
||`--status`|lists the status of the SSH server in the dyno|


```term

$ heroku dyno:exec
```


[(top)](#table-of-contents)


### `heroku dyno:forward PORT`

*forward traffic on a local port to a dyno*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|specify the dyno to connect to|
|`-p`|`--localPort`|the local port to use|


```term

$ heroku dyno:forward PORT
```


[(top)](#table-of-contents)


### `heroku dyno:kill DYNO`

*stop app dyno*


stop app dyno or dyno type
#### Examples:

```term
$ heroku ps:stop run.1828
Stopping run.1828 dyno... done

$ heroku ps:stop run
Stopping run dynos... done
```


[(top)](#table-of-contents)


### `heroku dyno:resize`

*manage dyno sizes*


Called with no arguments shows the current dyno size.

Called with one argument sets the size.
Where SIZE is one of free|hobby|standard-1x|standard-2x|performance

Called with 1..n TYPE=SIZE arguments sets the quantity per type.


[(top)](#table-of-contents)


### `heroku dyno:restart [DYNO]`

*restart app dynos*


if DYNO is not specified, restarts all dynos on app
#### Examples:

```term
$ heroku ps:restart web.1
Restarting web.1 dyno... done

$ heroku ps:restart web
Restarting web dynos... done

$ heroku ps:restart
Restarting dynos... done
```


[(top)](#table-of-contents)


### `heroku dyno:scale`

*scale dyno quantity up or down*

Appending a size (eg. web=2:Standard-2X) allows simultaneous scaling and resizing.

Omitting any arguments will display the app's current dyno formation, in a
format suitable for passing back into ps:scale.
#### Examples:

```term
$ heroku ps:scale web=3:Standard-2X worker+1
Scaling dynos... done, now running web at 3:Standard-2X, worker at 1:Standard-1X.

$ heroku ps:scale
web=3:Standard-2X worker=1:Standard-1X
```


[(top)](#table-of-contents)


### `heroku dyno:socks`

*launch a SOCKS proxy into a dyno*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|specify the dyno to connect to|

#### Example: 

```term
$ heroku dyno:socks
```


[(top)](#table-of-contents)


### `heroku dyno:stop DYNO`

*stop app dyno*


stop app dyno or dyno type
#### Examples:

```term
$ heroku ps:stop run.1828
Stopping run.1828 dyno... done

$ heroku ps:stop run
Stopping run dynos... done
```


[(top)](#table-of-contents)



## features

### `heroku features`

*list available app features*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku features:disable FEATURE`

*disables an app feature*


[(top)](#table-of-contents)


### `heroku features:enable FEATURE`

*enables an app feature*


[(top)](#table-of-contents)


### `heroku features:info FEATURE`

*display information about a feature*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


## git

### `heroku git:clone [DIRECTORY]`

*clones a heroku app to your local machine at DIRECTORY (defaults to app name)*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-a`|`--app`|the Heroku app to use|
|`-r`|`--remote`|the git remote to create, default "heroku"|
||`--ssh-git`|use SSH git protocol|

#### Examples:

```term
$ heroku git:clone -a example
Cloning into 'example'...
remote: Counting objects: 42, done.
...
```


[(top)](#table-of-contents)


### `heroku git:remote`

*adds a git remote to an app repo*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-a`|`--app`|the Heroku app to use|
|`-r`|`--remote`|the git remote to create|
||`--ssh-git`|use SSH git protocol|

extra arguments will be passed to git remote add
#### Examples:

```term
# set git remote heroku to https://git.heroku.com/example.git
$ heroku git:remote -a example

# set git remote heroku-staging to https://git.heroku.com/example-staging.git
$ heroku git:remote --remote heroku-staging -a example
```


[(top)](#table-of-contents)


## help

### `heroku help`

*display help*


[(top)](#table-of-contents)


## join

### `heroku join`

*add yourself to an organization app*


[(top)](#table-of-contents)


## keys

### `heroku keys`

*display your SSH keys*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-l`|`--long`|display full SSH keys|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku keys:add [KEY]`

*add an SSH key for a user*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-y`|`--yes`|automatically answer yes for all prompts|
||`--quiet`||

if no KEY is specified, will try to find ~/.ssh/id_rsa.pub
#### Examples:

```term
$ heroku keys:add
Could not find an existing public key.
Would you like to generate one? [Yn] y
Generating new SSH public key.
Uploading SSH public key /.ssh/id_rsa.pub... done

$ heroku keys:add /my/key.pub
Uploading SSH public key /my/key.pub... done
```


[(top)](#table-of-contents)


### `heroku keys:clear`

*remove all SSH keys for current user*


[(top)](#table-of-contents)


### `heroku keys:remove KEY`

*remove an SSH key from the user*

#### Example:

```term
$ heroku keys:remove email@example.com
Removing email@example.com SSH key... done
```


[(top)](#table-of-contents)


## labs

### `heroku labs`

*list experimental features*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|display as json|


[(top)](#table-of-contents)


### `heroku labs:disable FEATURE`

*disables an experimental feature*


[(top)](#table-of-contents)


### `heroku labs:enable FEATURE`

*enables an experimental feature*


[(top)](#table-of-contents)


### `heroku labs:info FEATURE`

*show feature info*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|display as json|


[(top)](#table-of-contents)


## leave

### `heroku leave`

*remove yourself from an organization app*


[(top)](#table-of-contents)


## local

### `heroku local [PROCESSNAME]`

*run heroku app locally*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--concurrency`|number of processes to start|
|`-e`|`--env`|location of env file (defaults to .env)|
|`-f`|`--procfile`|use a different Procfile|
|`-p`|`--port`|port to listen on|
|`-r`|`--restart`|restart process if it dies|

Start the application specified by a Procfile (defaults to ./Procfile)
#### Examples:

```term
heroku local
heroku local web
heroku local web=2
heroku local web=1,worker=2
```


[(top)](#table-of-contents)


### `heroku local:run`

*run a one-off command*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-e`|`--env`||
|`-p`|`--port`||

#### Example:

```term
heroku local:run bin/migrate
```


[(top)](#table-of-contents)


### `heroku local:start [PROCESSNAME]`

*run heroku app locally*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--concurrency`|number of processes to start|
|`-e`|`--env`|location of env file (defaults to .env)|
|`-f`|`--procfile`|use a different Procfile|
|`-p`|`--port`|port to listen on|
|`-r`|`--restart`|restart process if it dies|

Start the application specified by a Procfile (defaults to ./Procfile)
#### Examples:

```term
heroku local
heroku local web
heroku local web=2
heroku local web=1,worker=2
```


[(top)](#table-of-contents)


### `heroku local:version`

*display node-foreman version*

Display node-foreman version

[(top)](#table-of-contents)


## lock

### `heroku lock`

*prevent organization members from joining an app*


[(top)](#table-of-contents)


## login

### `heroku login`

*login with your Heroku credentials*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-e`|`--expires-in`|duration of token in seconds|
||`--sso`|login for enterprise users under SSO|


[(top)](#table-of-contents)


## logout

### `heroku logout`

*display the current logged in user*


[(top)](#table-of-contents)


## logs

### `heroku logs`

*display recent log output*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|dyno to limit filter by|
|`-n`|`--num`|number of lines to display|
|`-p`|`--ps`|hidden alias for dyno|
|`-s`|`--source`|log source to limit filter by|
|`-t`|`--tail`|continually stream logs|
||`--force-colors`|force use of colors (even on non-tty output)|


```term

$ heroku logs
2012-01-01T12:00:00+00:00 heroku[api]: Config add EXAMPLE by email@example.com
2012-01-01T12:00:01+00:00 heroku[api]: Release v1 created by email@example.com
```


[(top)](#table-of-contents)


## maintenance

### `heroku maintenance`

*display the current maintenance status of app*


[(top)](#table-of-contents)


### `heroku maintenance:off`

*take the app out of maintenance mode*


[(top)](#table-of-contents)


### `heroku maintenance:on`

*put the app into maintenance mode*


[(top)](#table-of-contents)


## members

### `heroku members`

*list members of an organization or a team*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-r`|`--role`|filter by role|
|`-t`|`--team`|team to use|
||`--json`|output in json format|
||`--pending`|filter by pending team invitations|


[(top)](#table-of-contents)


### `heroku members:add EMAIL`

*adds a user to an organization or a team*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-r`|`--role`|member role (admin, collaborator, member, owner)|
|`-t`|`--team`|team to use|


[(top)](#table-of-contents)


### `heroku members:remove EMAIL`

*removes a user from an organization or a team*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-t`|`--team`|team to use|


[(top)](#table-of-contents)


### `heroku members:set EMAIL`

*sets a members role in an organization or a team*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-r`|`--role`|member role (admin, collaborator, member, owner)|
|`-t`|`--team`|team to use|


[(top)](#table-of-contents)


## notifications

### `heroku notifications`

*display notifications*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--all`|view all notifications (not just the ones for the current app)|
||`--json`|output in json format|
||`--read`|show notifications already read|


[(top)](#table-of-contents)


## orgs

### `heroku orgs`

*list the organizations that you are a member of*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--enterprise`|filter by enterprise orgs|
||`--json`|output in json format|
||`--teams`|filter by teams|


[(top)](#table-of-contents)



### `heroku orgs:open`

*open the organization interface in a browser window*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-t`|`--team`|team to use|


[(top)](#table-of-contents)


## outbound-rules

### `heroku outbound-rules [SPACE]`

*list Outbound Rules for a space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get outbound rules from|
||`--json`|output in json format|


Outbound Rules are only available on Private Spaces.

Newly created spaces will have an "Allow All" rule set by default
allowing all egress dyno traffic outside of the space.  You can
remove this default rule to completely stop your private dynos from
talking to the world.

You can add specific rules that only allow your dyno to communicate with trusted hosts.


[(top)](#table-of-contents)


### `heroku outbound-rules:add`

*add outbound rules to a Private Space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to add rule to|
||`--confirm`|set to space name to bypass confirm prompt|
||`--dest`|target CIDR block dynos are allowed to communicate with|
||`--port`|the port dynos are allowed to use when communicating with hosts in destination CIDR block. Accepts a range in `<lowest port>-<highest port>` format. 0 is the minimum. The maximum port allowed is 65535, except for ICMP with a maximum of 255.|
||`--protocol`|the protocol dynos are allowed to use when communicating with hosts in destination CIDR block. Valid protocols are "tcp", "udp", "icmp", "0-255" and "any".|


The destination flag uses CIDR notation.
#### Example:

```term
$ heroku outbound-rules:add --space my-space --dest 192.168.2.0/24 --protocol tcp --port 80
Added 192.168.0.1/24 to the outbound rules on my-space
```
#### Example with port range:

```term
$ heroku outbound-rules:add --space my-space --dest 192.168.2.0/24 --protocol tcp --port 80-100
Added 192.168.0.1/24 to the outbound rules on my-space
```
#### Example opening up everything

```term
$ heroku outbound-rules:add --space my-space --dest 0.0.0.0/0 --protocol any --port any
Added 0.0.0.0/0 to the outbound rules on my-space
```

ICMP Rules
The ICMP protocol has types, not ports, but the underlying systems treat them as the same. For this reason,
when you want to allow ICMP traffic you will use the --port flag to specify the ICMP types you want to
allow. ICMP types are numbered, 0-255.


[(top)](#table-of-contents)


### `heroku outbound-rules:remove RULENUMBER`

*remove a Rules from the list of Outbound Rules*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--confirm`|set to space name to bypass confirm prompt|
||`--space`|space to remove rule from|

#### Example:

```term
$ heroku outbound-rules:remove --space my-space 4
Removed 192.168.2.0/24 from trusted IP ranges on my-space
```


[(top)](#table-of-contents)


## pg

### `heroku pg [DATABASE]`

*show database information*


[(top)](#table-of-contents)


### `heroku pg:backups`

*list database backups*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||
|`-o`|`--output`||
|`-q`|`--quiet`||
|`-v`|`--verbose`||
||`--at`||
||`--wait-interval`||


[(top)](#table-of-contents)


### `heroku pg:backups:cancel [BACKUP_ID]`

*cancel an in-progress backup or restore (default newest)*


[(top)](#table-of-contents)


### `heroku pg:backups:capture [DATABASE]`

*capture a new backup*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-v`|`--verbose`||
||`--wait-interval`||


[(top)](#table-of-contents)


### `heroku pg:backups:delete BACKUP_ID`

*delete a backup*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||


[(top)](#table-of-contents)


### `heroku pg:backups:download [BACKUP_ID]`

*downloads database backup*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-o`|`--output`|location to download to. Defaults to latest.dump|


[(top)](#table-of-contents)


### `heroku pg:backups:info [BACKUP_ID]`

*get information about a specific backup*


[(top)](#table-of-contents)




### `heroku pg:backups:restore [BACKUP] [DATABASE]`

*restore a backup (default latest) to a database*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||
|`-v`|`--verbose`||
||`--wait-interval`||

defaults to saving the latest database to DATABASE_URL

[(top)](#table-of-contents)


### `heroku pg:backups:schedule [DATABASE]`

*schedule daily backups for given database*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--at`|at a specific (24h) hour in the given timezone. Defaults to UTC. --at '[HOUR]:00 [TIMEZONE]'|


[(top)](#table-of-contents)


### `heroku pg:backups:schedules`

*list backup schedule*


[(top)](#table-of-contents)


### `heroku pg:backups:unschedule [DATABASE]`

*stop daily backups*


[(top)](#table-of-contents)


### `heroku pg:backups:url [BACKUP_ID]`

*get secret but publicly accessible URL of a backup*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-q`|`--quiet`||


[(top)](#table-of-contents)


### `heroku pg:copy SOURCE TARGET`

*copy all data from source db to target*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--confirm`||
||`--verbose`||
||`--wait-interval`||

at least one of the databases must be a Heroku PostgreSQL DB

[(top)](#table-of-contents)


### `heroku pg:credentials [DATABASE]`

*manage the database credentials*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--reset`|reset database credentials|


[(top)](#table-of-contents)


### `heroku pg:credentials:create [DATABASE]`

*create credential within database*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-n`|`--name`|name of the new credential within the database|

#### Example:

```term
heroku pg:credentials:create postgresql-something-12345 --name new-cred-name
```


[(top)](#table-of-contents)


### `heroku pg:credentials:destroy [DATABASE]`

*destroy credential within database*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||
|`-n`|`--name`|unique identifier for the credential|

#### Example:

```term
heroku pg:credentials:destroy postgresql-transparent-56874 --name cred-name -a woodstock-production
```


[(top)](#table-of-contents)


### `heroku pg:credentials:repair-default [DATABASE]`

*repair the permissions of the default credential within database*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||

#### Example:

```term
heroku pg:credentials:repair-default postgresql-something-12345
```


[(top)](#table-of-contents)


### `heroku pg:credentials:rotate [DATABASE]`

*rotate the database credentials*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||
|`-n`|`--name`|which credentials to rotate (default credentials if not specified)|
||`--all`|rotate all credentials|
||`--force`|forces rotating the targeted credentials|


[(top)](#table-of-contents)


### `heroku pg:credentials:url [DATABASE]`

*show information on a database credential*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-n`|`--name`|which credentials to show (default credentials if not specified)|


[(top)](#table-of-contents)


### `heroku pg:diagnose [DATABASE|REPORT_ID]`

*run or view diagnostics report*


defaults to DATABASE_URL database if no DATABASE is specified
if REPORT_ID is specified instead, a previous report is displayed


[(top)](#table-of-contents)


### `heroku pg:info [DATABASE]`

*show database information*


[(top)](#table-of-contents)


### `heroku pg:kill PID [DATABASE]`

*kill a query*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-f`|`--force`||


[(top)](#table-of-contents)


### `heroku pg:killall [DATABASE]`

*terminates all connections*


[(top)](#table-of-contents)


### `heroku pg:links [DATABASE]`

*lists all datbases and information on link*


[(top)](#table-of-contents)


### `heroku pg:links:create REMOTE DATABASE`

*create a link between data stores*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--as`|name of link to create|

#### Example:

```term
heroku pg:links:create HEROKU_REDIS_RED HEROKU_POSTGRESQL_CERULEAN
```


[(top)](#table-of-contents)


### `heroku pg:links:destroy DATABASE LINK`

*destroys a link between data stores*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||

#### Example:

```term
heroku pg:links:destroy HEROKU_POSTGRESQL_CERULEAN redis-symmetrical-100
```


[(top)](#table-of-contents)


### `heroku pg:maintenance [DATABASE]`

*show current maintenance information*


[(top)](#table-of-contents)


### `heroku pg:maintenance:run [DATABASE]`

*start maintenance*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-f`|`--force`||


[(top)](#table-of-contents)


### `heroku pg:maintenance:window DATABASE WINDOW`

*set weekly maintenance window*

All times are in UTC.
#### Example:

```term
heroku pg:maintenance:window postgres-slippery-100 "Sunday 06:00"
```


[(top)](#table-of-contents)


### `heroku pg:promote DATABASE`

*sets DATABASE as your DATABASE_URL*


[(top)](#table-of-contents)


### `heroku pg:ps [DATABASE]`

*view active queries with execution time*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-v`|`--verbose`||


[(top)](#table-of-contents)


### `heroku pg:psql [DATABASE]`

*open a psql shell to the database*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--command`|SQL command to run|
||`--credential`|credential to use|


[(top)](#table-of-contents)


### `heroku pg:pull SOURCE TARGET`

*pull Heroku database into local or remote database*

Pull from SOURCE into TARGET. TARGET must not already exist.

To delete a local database run `dropdb TARGET`

TARGET will be created locally if it's a database name or remotely if it's a fully qualified URL.
#### Examples:

```term
# pull Heroku DB named postgresql-swimmingly-100 into local DB mylocaldb
$ heroku pg:pull postgresql-swimmingly-100 mylocaldb --app sushi

# pull Heroku DB named postgresql-swimmingly-100 into remote DB at postgres://myhost/mydb
$ heroku pg:pull postgresql-swimmingly-100 postgres://myhost/mydb --app sushi
```


[(top)](#table-of-contents)


### `heroku pg:push SOURCE TARGET`

*push local or remote into Heroku database*

Push from SOURCE into TARGET. TARGET must not already exist.

To empty a Heroku database for import run `heroku pg:reset`

SOURCE must be either the name of a database existing on your localhost or the
fully qualified URL of a remote database.
#### Examples:

```term
# push mylocaldb into a Heroku DB named postgresql-swimmingly-100
$ heroku pg:push mylocaldb postgresql-swimmingly-100

# push remote DB at postgres://myhost/mydb into a Heroku DB named postgresql-swimmingly-100
$ heroku pg:push postgres://myhost/mydb postgresql-swimmingly-100
```


[(top)](#table-of-contents)


### `heroku pg:reset [DATABASE]`

*delete all data in DATABASE*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||


[(top)](#table-of-contents)


### `heroku pg:unfollow DATABASE`

*stop a replica from following and make it a writeable database*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||


[(top)](#table-of-contents)


### `heroku pg:upgrade [DATABASE]`

*unfollow a database and upgrade it to the latest stable PostgreSQL version*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--confirm`||

to upgrade to another PostgreSQL version, use pg:copy instead

[(top)](#table-of-contents)


### `heroku pg:wait [DATABASE]`

*blocks until database is available*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--wait-interval`|how frequently to poll in seconds (to avoid rate limiting)|


[(top)](#table-of-contents)


## pipelines

### `heroku pipelines`

*list pipelines you have access to*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|

#### Example:

```term
$ heroku pipelines
=== My Pipelines
example
sushi
```


[(top)](#table-of-contents)


### `heroku pipelines:add PIPELINE`

*add this app to a pipeline*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--stage`|stage of first app in pipeline|

The app and pipeline names must be specified.
The stage of the app will be guessed based on its name if not specified.
#### Example:

```term
$ heroku pipelines:add example -a example-admin -s production
Adding example-admin to example pipeline as production... done
```


[(top)](#table-of-contents)


### `heroku pipelines:create [NAME]`

*create a new pipeline*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--stage`|stage of first app in pipeline|

An existing app must be specified as the first app in the pipeline.
The pipeline name will be inferred from the app name if not specified.
The stage of the app will be guessed based on its name if not specified.
#### Example:

```term
$ heroku pipelines:create -a example-staging
? Pipeline name: example
? Stage of example-staging: staging
Creating example pipeline... done
Adding example-staging to example pipeline as staging... done
```


[(top)](#table-of-contents)


### `heroku pipelines:destroy PIPELINE`

*destroy a pipeline*

#### Example:

```term
$ heroku pipelines:destroy example
Destroying example pipeline... done
```


[(top)](#table-of-contents)


### `heroku pipelines:diff`

*compares the latest release of this app to its downstream app(s)*


[(top)](#table-of-contents)


### `heroku pipelines:info PIPELINE`

*show list of apps in a pipeline*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|

#### Example:

```term
$ heroku pipelines:info example
=== example
Staging:     example-staging
Production:  example
example-admin
```


[(top)](#table-of-contents)


### `heroku pipelines:list`

*list pipelines you have access to*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|

#### Example:

```term
$ heroku pipelines
=== My Pipelines
example
sushi
```


[(top)](#table-of-contents)


### `heroku pipelines:open PIPELINE`

*open a pipeline in dashboard*

#### Example:

```term
$ heroku pipelines:open example
```


[(top)](#table-of-contents)


### `heroku pipelines:promote`

*promote the latest release of this app to its downstream app(s)*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-t`|`--to`|comma separated list of apps to promote to|

#### Example:

```term
$ heroku pipelines:promote -a example-staging
Promoting example-staging to example (production)... done, v23
Promoting example-staging to example-admin (production)... done, v54
```
#### Example:

```term
$ heroku pipelines:promote -a example-staging --to my-production-app1,my-production-app2
Starting promotion to apps: my-production-app1,my-production-app2... done
Waiting for promotion to complete... done
Promotion successful
my-production-app1: succeeded
my-production-app2: succeeded
```


[(top)](#table-of-contents)


### `heroku pipelines:remove`

*remove this app from its pipeline*

#### Example:

```term
$ heroku pipelines:remove -a example-admin
Removing example-admin... done
```


[(top)](#table-of-contents)


### `heroku pipelines:rename PIPELINE NAME`

*rename a pipeline*

#### Example:

```term
$ heroku pipelines:rename example www
Renaming example pipeline to www... done
```


[(top)](#table-of-contents)


### `heroku pipelines:setup [NAME] [REPO]`

*bootstrap a new pipeline with common settings and create a production and staging app (requires a fully formed app.json in the repo)*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-o`|`--organization`|the organization which will own the apps (can also use --team)|
|`-t`|`--team`|the team which will own the apps (can also use --organization)|
|`-y`|`--yes`|accept all default settings without prompting|

#### Example:

```term
heroku pipelines:setup example githuborg/reponame -o example-org
? Automatically deploy the master branch to staging? Yes
? Wait for CI to pass before deploying the master branch to staging? Yes
? Enable review apps? Yes
? Automatically create review apps for every PR? Yes
? Automatically destroy idle review apps after 5 days? Yes
Creating pipeline... done
Linking to repo... done
Creating production and staging apps (⬢ example and ⬢ example-staging)
Configuring pipeline... done
View your new pipeline by running `heroku pipelines:open e5a55ffa-de3f-11e6-a245-3c15c2e6bc1e`
```


[(top)](#table-of-contents)


### `heroku pipelines:update`

*update this app's stage in a pipeline*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--stage`|new stage of app|

#### Example:

```term
$ heroku pipelines:update -s staging -a example-admin
Changing example-admin to staging... done
```


[(top)](#table-of-contents)


## plugins

### `heroku plugins`

*list installed plugins*


[(top)](#table-of-contents)


### `heroku plugins:install`

*installs a plugin into the CLI*


[(top)](#table-of-contents)


### `heroku plugins:link`

*links a local plugin to the CLI for development*


[(top)](#table-of-contents)


### `heroku plugins:uninstall`

*uninstalls or unlinks a plugin*


[(top)](#table-of-contents)


### `heroku plugins:update`

*update installed plugins*


[(top)](#table-of-contents)


## ps

### `heroku ps`

*list dynos for an app*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-x`|`--extended`||
||`--json`|display as json|

#### Examples:

```term
$ heroku ps
=== run: one-off dyno
run.1: up for 5m: bash

=== web: bundle exec thin start -p $PORT
web.1: created for 30s

$ heroku ps run # specifying types
=== run: one-off dyno
run.1: up for 5m: bash
```


[(top)](#table-of-contents)


### `heroku ps:copy FILE`

*copy a file from a dyno to the local filesystem*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|specify the dyno to connect to|
|`-o`|`--output`|the name of the output file|


```term

$ heroku ps:copy FILENAME
```


[(top)](#table-of-contents)


### `heroku ps:exec`

*create an SSH session to a dyno*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|specify the dyno to connect to|
||`--ssh`|use native ssh|
||`--status`|lists the status of the SSH server in the dyno|


```term

$ heroku ps:exec
```


[(top)](#table-of-contents)


### `heroku ps:forward PORT`

*forward traffic on a local port to a dyno*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|specify the dyno to connect to|
|`-p`|`--localPort`|the local port to use|


```term

$ heroku ps:forward PORT
```


[(top)](#table-of-contents)


### `heroku ps:kill DYNO`

*stop app dyno*


stop app dyno or dyno type
#### Examples:

```term
$ heroku ps:stop run.1828
Stopping run.1828 dyno... done

$ heroku ps:stop run
Stopping run dynos... done
```


[(top)](#table-of-contents)


### `heroku ps:resize`

*manage dyno sizes*


Called with no arguments shows the current dyno size.

Called with one argument sets the size.
Where SIZE is one of free|hobby|standard-1x|standard-2x|performance

Called with 1..n TYPE=SIZE arguments sets the quantity per type.


[(top)](#table-of-contents)


### `heroku ps:restart [DYNO]`

*restart app dynos*


if DYNO is not specified, restarts all dynos on app
#### Examples:

```term
$ heroku ps:restart web.1
Restarting web.1 dyno... done

$ heroku ps:restart web
Restarting web dynos... done

$ heroku ps:restart
Restarting dynos... done
```


[(top)](#table-of-contents)


### `heroku ps:scale`

*scale dyno quantity up or down*

Appending a size (eg. web=2:Standard-2X) allows simultaneous scaling and resizing.

Omitting any arguments will display the app's current dyno formation, in a
format suitable for passing back into ps:scale.
#### Examples:

```term
$ heroku ps:scale web=3:Standard-2X worker+1
Scaling dynos... done, now running web at 3:Standard-2X, worker at 1:Standard-1X.

$ heroku ps:scale
web=3:Standard-2X worker=1:Standard-1X
```


[(top)](#table-of-contents)


### `heroku ps:socks`

*launch a SOCKS proxy into a dyno*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-d`|`--dyno`|specify the dyno to connect to|

#### Example: 

```term
$ heroku ps:socks
```


[(top)](#table-of-contents)


### `heroku ps:stop DYNO`

*stop app dyno*


stop app dyno or dyno type
#### Examples:

```term
$ heroku ps:stop run.1828
Stopping run.1828 dyno... done

$ heroku ps:stop run
Stopping run dynos... done
```


[(top)](#table-of-contents)


### `heroku ps:type`

*manage dyno sizes*


Called with no arguments shows the current dyno size.

Called with one argument sets the size.
Where SIZE is one of free|hobby|standard-1x|standard-2x|performance

Called with 1..n TYPE=SIZE arguments sets the quantity per type.


[(top)](#table-of-contents)


## psql

### `heroku psql [DATABASE]`

*open a psql shell to the database*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--command`|SQL command to run|
||`--credential`|credential to use|


[(top)](#table-of-contents)


## regions

### `heroku regions`

*list available regions for deployment*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--common`|show regions for common runtime|
||`--json`|output in json format|
||`--private`|show regions for private spaces|


[(top)](#table-of-contents)


## releases

### `heroku releases`

*display the releases for an app*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-n`|`--num`|number of releases to show|
|`-x`|`--extended`||
||`--json`|output releases in json format|

#### Example:

```term
$ heroku releases
=== example Releases
v1 Config add FOO_BAR email@example.com 2015/11/17 17:37:41 (~ 1h ago)
v2 Config add BAR_BAZ email@example.com 2015/11/17 17:37:41 (~ 1h ago)
v3 Config add BAZ_QUX email@example.com 2015/11/17 17:37:41 (~ 1h ago)
```


[(top)](#table-of-contents)


### `heroku releases:info [RELEASE]`

*view detailed information for a release*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--shell`|output in shell format|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku releases:output [RELEASE]`

*view the release command output*


[(top)](#table-of-contents)


### `heroku releases:rollback [RELEASE]`

*rollback to a previous release*

If RELEASE is not specified, it will rollback one release

[(top)](#table-of-contents)


## run

### `heroku run`

*run a one-off process inside a heroku dyno*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-e`|`--env`|environment variables to set (use ';' to split multiple vars)|
|`-s`|`--size`|dyno size|
|`-x`|`--exit-code`|passthrough the exit code of the remote command|
||`--listen`|listen on a local port|
||`--no-tty`|force the command to not run in a tty|

#### Examples:

```term
$ heroku run bash
Running bash on app.... up, run.1
~ $

$ heroku run -s hobby -- myscript.sh -a arg1 -s arg2
Running myscript.sh -a arg1 -s arg2 on app.... up, run.1
```


[(top)](#table-of-contents)


### `heroku run:detached`

*run a detached dyno, where output is sent to your logs*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-e`|`--env`|environment variables to set (use ';' to split multiple vars)|
|`-s`|`--size`|dyno size|
|`-t`|`--tail`|stream logs from the dyno|

#### Example:

```term
$ heroku run:detached ls
Running ls on app [detached]... up, run.1
Run heroku logs -a app -p run.1 to view the output.
```


[(top)](#table-of-contents)



## sessions

### `heroku sessions`

*list your OAuth sessions*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku sessions:destroy ID`

*delete (logout) OAuth session by ID*


[(top)](#table-of-contents)


## spaces

### `heroku spaces`

*list available spaces*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-t`|`--team`|team to use|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku spaces:create [SPACE]`

*create a new space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|name of space to create|
|`-t`|`--team`|team to use|
||`--channel`||
||`--cidr`|the RFC-1918 CIDR the space will use|
||`--features`|a list of features separated by commas|
||`--kpi-url`|self-managed KPI endpoint to use|
||`--log-drain-url`|direct log drain url|
||`--owner-pool`|owner pool name|
||`--region`|region name|
||`--shield`|create a Shield space|

#### Example:

```term
$ heroku spaces:create --space my-space --org my-org --region oregon
Creating space my-space in organization my-org... done
=== my-space
ID:           e7b99e37-69b3-4475-ad47-a5cc5d75fd9f
Organization: my-org
Region:       oregon
State:        allocating
Created at:   2016-01-06T03:23:13Z

```


[(top)](#table-of-contents)


### `heroku spaces:destroy [SPACE]`

*destroy a space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to destroy|
||`--confirm`|set to space name to bypass confirm prompt|

#### Example:

```term
$ heroku spaces:destroy --space my-space
Destroying my-space... done
```


[(top)](#table-of-contents)


### `heroku spaces:info [SPACE]`

*show info about a space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get info of|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku spaces:peering:info [SPACE]`

*display the information necessary to initiate a peering connection*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get peering info from|
||`--json`|output in json format|

#### Example:

```term
$ heroku spaces:peering:info example-space
=== example-space Peering Info
AWS Account ID:    012345678910
AWS Region:        us-west-2
AWS VPC ID:        vpc-baadf00d
AWS VPC CIDR:      10.0.0.0/16
Dyno CIDRs:        10.0.128.0/20, 10.0.144.0/20
Unavailable CIDRs: 10.1.0.0/16
```

You will use the information provied by this command to establish a peering connection request from your AWS VPC to your private space.

To start the peering process, go into your AWS console for the VPC you would like peered with your Private Space,
navigate to the VPC service, choose the "Peering Connections" option and click the "Create peering connection" button.

- The AWS Account ID and VPC ID are necessary for the AWS VPC Peering connection wizard.
- You will also need to configure your VPC route table to route the Dyno CIDRs through the peering connection.

Once you've established the peering connection request, you can use the spaces:peerings:accept command to accept and
configure the peering connection for the space.


[(top)](#table-of-contents)


### `heroku spaces:peerings [SPACE]`

*list peering connections for a space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get peer list from|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku spaces:peerings:accept [PCXID]`

*accepts a pending peering request for a private space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pcxid`|PCX ID of a pending peering|
|`-s`|`--space`|space to get peering info from|

#### Example:

```term
$ heroku spaces:peerings:accept pcx-4bd27022 --space example-space
Accepting and configuring peering connection pcx-4bd27022
```


[(top)](#table-of-contents)


### `heroku spaces:peerings:destroy [PCXID]`

*destroys an active peering connection in a private space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-p`|`--pcxid`|PCX ID of a pending peering|
|`-s`|`--space`|space to get peering info from|
||`--confirm`|set to PCX ID to bypass confirm prompt|

#### Example:

```term
$ heroku peerings:destroy pcx-4bd27022 --confirm pcx-4bd27022 --space example-space
Tearing down peering connection pcx-4bd27022
```


[(top)](#table-of-contents)


### `heroku spaces:ps [SPACE]`

*list dynos for a space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get dynos of|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku spaces:rename`

*renames a space*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--from`|current name of space|
||`--to`|desired name of space|

#### Example:

```term
$ heroku spaces:rename --from old-space-name --to new-space-name
Renaming space old-space-name to new-space-name... done
```


[(top)](#table-of-contents)


### `heroku spaces:topology [SPACE]`

*show space topology*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get topology of|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku spaces:vpn:config [SPACE]`

*display the configuration information for VPN*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get VPN config from|

#### Example:

```term
$ heroku spaces:vpn:config my-space
```


[(top)](#table-of-contents)


### `heroku spaces:vpn:create [SPACE]`

*create VPN*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-c`|`--cidrs`|a list of routable CIDRs separated by commas|
|`-i`|`--ip`|public IP of customer gateway|
|`-s`|`--space`|space name|

#### Example:

```term
$ heroku spaces:vpn:create --ip 35.161.69.30 --cidrs 172.16.0.0/16,10.0.0.0/24 --space my-space
Creating VPN in space my-space... done
▸    Use spaces:vpn:wait to track allocation.
```


[(top)](#table-of-contents)


### `heroku spaces:vpn:destroy [SPACE]`

*destroys VPN in a private space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get peering info from|
||`--confirm`|set to space name bypass confirm prompt|

#### Example:

```term
$ heroku spaces:vpn:destroy --confirm --space my-space
Tearing down VPN in space my-space
```


[(top)](#table-of-contents)


### `heroku spaces:vpn:info [SPACE]`

*display the information for VPN*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get VPN info from|
||`--json`|output in json format|

#### Example:

```term
$ heroku spaces:vpn:info my-space
=== my-space VPN Info
ID:             123456789012
Public IP:      35.161.69.30
Routable CIDRs: 172.16.0.0/16
State:          available
=== my-space Tunnel Info
VPN Tunnel  IP Address     Status  Status Last Changed   Details
──────────  ─────────────  ──────  ────────────────────  ──────────────
Tunnel 1    52.44.146.197  UP      2016-10-25T22:09:05Z  status message
Tunnel 2    52.44.146.197  UP      2016-10-25T22:09:05Z  status message
```


[(top)](#table-of-contents)


### `heroku spaces:vpn:wait [SPACE]`

*wait for VPN to be created*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-i`|`--interval`|seconds to wait between poll intervals|
|`-s`|`--space`|space to wait for VPN from|
|`-t`|`--timeout`|maximum number of seconds to wait|
||`--json`|output in json format|


[(top)](#table-of-contents)


### `heroku spaces:wait [SPACE]`

*wait for a space to be created*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-i`|`--interval`|seconds to wait between poll intervals|
|`-s`|`--space`|space to get info of|
|`-t`|`--timeout`|maximum number of seconds to wait|
||`--json`|output in json format|


[(top)](#table-of-contents)


## status

### `heroku status`

*display current status of Heroku platform*


[(top)](#table-of-contents)


## teams

### `heroku teams`

*list the teams that you are a member of*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--json`|output in json format|


[(top)](#table-of-contents)


## trusted-ips

### `heroku trusted-ips [SPACE]`

*list trusted IP ranges for a space*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to get inbound rules from|
||`--json`|output in json format|


Trusted IP ranges are only available on Private Spaces.

The space name is a required parameter. Newly created spaces will have 0.0.0.0/0 set by default
allowing all traffic to applications in the space. More than one CIDR block can be provided at
a time to the commands listed below. For example 1.2.3.4/20 and 5.6.7.8/20 can be added with:


[(top)](#table-of-contents)


### `heroku trusted-ips:add SOURCE`

*add one range to the list of trusted IP ranges*

#### Flags

|Short|Long|Description|
|------|------|------|
|`-s`|`--space`|space to add rule to|
||`--confirm`|set to space name to bypass confirm prompt|


Uses CIDR notation.
#### Example:

```term
$ heroku trusted-ips:add --space my-space 192.168.2.0/24
Added 192.168.0.1/24 to trusted IP ranges on my-space
```


[(top)](#table-of-contents)


### `heroku trusted-ips:remove SOURCE`

*remove a range from the list of trusted IP ranges*

#### Flags

|Short|Long|Description|
|------|------|------|
||`--confirm`|set to space name to bypass confirm prompt|
||`--space`|space to remove rule from|


Uses CIDR notation.
#### Example:

```term
$ heroku trusted-ips:remove --space my-space 192.168.2.0/24
Removed 192.168.2.0/24 from trusted IP ranges on my-space
```


[(top)](#table-of-contents)


## twofactor

### `heroku twofactor`

*check 2fa status*


[(top)](#table-of-contents)


### `heroku twofactor:disable`

*disable 2fa on account*


[(top)](#table-of-contents)


### `heroku twofactor:generate-recovery-codes`

*generates and replaces recovery codes*


[(top)](#table-of-contents)


## unlock

### `heroku unlock`

*unlock an app so any organization member can join*


[(top)](#table-of-contents)


## update

### `heroku update`

*update the Heroku CLI*


[(top)](#table-of-contents)


## version

### `heroku version`

*show CLI version*


[(top)](#table-of-contents)


## which

### `heroku which`

*show which plugin a command is from*


[(top)](#table-of-contents)


## whoami

### `heroku whoami`

*display the current logged in user*


[(top)](#table-of-contents)
