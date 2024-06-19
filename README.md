# System Design

A web-based gaming platform (=gPlatform) is currently providing it’s services to one single gaming site (=gSite).
The services provided by gPlatform to gSite include hosting web-games and backoffice for managing players that sign-up and play on gSite.

We want to make gPlatform into a SaaS that can be sold to other gaming sites as subscription-based service.

Each new gaming company operating a gaming site, will have it’s own dedicated domain - for example:
Company A will have a domain cool-games.com
Company B will have a domain luck-games.co.uk
etc

Currently at gPlatform, users are identified by using email as a unique key.

## Give a short, clear explanation for every question below:

### How can we design the system in a way that every Company will be able to serve games on their gaming site from their domain?

```
The first and most obvious thing that follows from the condition is domain-level separation via both the nginx reverse-proxy and the Host (proxy_set_header Host $host;) header. A separate nginx server configuration file is should created for each company and a cron-job that checks if the subscription is up to date.
```

### What modification should be done to the users table at gPlatform to support this change?

```
We can do it without modifying the users table by implementing logic to converting user`s email to common pattern view USERNAME+HOST@MAILDOMAIN like user+cool-games.com@webmail.com and user+luck-games.co.uk@webmail.com in reg/auth services pipeline.

If a table change is required, the 'hasBelongsToMay' relation to companies via host should be added. But I like the first option more.
```

### Considering we have 1 backend cluster that serves all companies, how can we validate a user login on one gaming domain in such a way that it does not give access to a different gaming domain? (i.e. authenticating on site A, grants access to site A only)

```
Since a Host header will always be in the request, this will not be a problem. We can also guard it by issuing JWT tokens only for a specific host (just add this to token`s payload).
```
