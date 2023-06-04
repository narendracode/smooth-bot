# Uniswap Trading Bot

## Install
Install the dependencies:

```sh
yarn
```

## Available Scripts

In the root directory, you can run:

### `yarn build`

Build all packages:

```sh
yarn build
```

Build a single package:

```sh
yarn build --scope=<package-name>
```

### `yarn clean`

Delete build artifacts for all packages:

```sh
yarn clean
```

Clean a single package:

```sh
yarn clean --scope=<package-name>
```



### `yarn lint`

Lint all packages:

```sh
yarn lint
```

Lint a single package:

```sh
yarn lint --scope=<package-name>
```

For example:

```sh
yarn lint --scope=example-a
```

### `yarn lint:fix`

Fix lint errors for all packages:

```sh
yarn lint:fix
```

Fix lint errors for a single package:

```sh
yarn lint:fix --scope=<package-name>
```

For example:

```sh
yarn lint:fix --scope=example-a
```

### `yarn test`

Run tests for all packages:

```sh
yarn test
```

Run tests for a single package:

```sh
yarn test --scope=<package-name>
```

For example:

```sh
yarn test --scope=example-a
```
## License

[MIT](LICENSE)
