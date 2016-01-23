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

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
