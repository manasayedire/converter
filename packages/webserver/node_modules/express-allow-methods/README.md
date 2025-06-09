# `express-allow-methods`

Express middleware for sending [`HTTP 405 Method Not Allowed`](https://httpstatuses.com/405) response. Due to the specification requirements, it also responds with the `Allow` header with comma-separated list of allowed methods.

<center>
	<img src="demo.gif" alt="Package demo using cUrl terminal command" />
</center>

## Prerequisites

- Node.JS v0.11.8+
- (optionally) TypeScript v3.8.2+

## Installation

```sh
npm i express-allow-methods

# can be skipped for non-TypeScript projects
npm i --save-dev typescript
```

### In a TypeScript file:

```ts
import allowMethods from "express-allow-methods";
```

### In a JavaScript (CommonJS) file:

```ts
const allowMethods = require("express-allow-methods").default;
```

## Usage

```ts
import express from "express";
import allowMethods from "express-allow-methods";

const app = express();

app.route("/")
	.all(allowMethods("GET", "POST"))
	.get((req, res) => {
		// GET /
	})
	.post((req, res) => {
		// POST /
	})
	.patch((req, res) => {
		// PATCH /
		// the code here will never run
	});
```
