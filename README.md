# Auth0 Github Permission Manager Sample


# Rule
Since we are adding a Github Identity Provider to our account users will be allowed to authenticate with Github. However, since we are only using Github for verification and don't actually want to use the IdP we create a rule to block all authentications with github except for the purposes of this single app.


```js
function (user, context, callback) {

  if (context.clientName === 'YOUR APP NAME') {
    return callback(null, user, context);
  }

  if (context.connection === 'github') {
    callback(new UnauthorizedError('This application does not permit authentication with Github.'));
  }
}
```
