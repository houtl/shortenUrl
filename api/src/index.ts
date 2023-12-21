import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import shortid from "shortid";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();
const urlDatabase: URLDatabase = {};
const baseUrl = `http://localhost:${process.env.PORT}`;

interface URLDatabase {
  [key: string]: string;
}
app.use(cors());
app.use(bodyParser());

router.post("/shorten", async (ctx) => {
  const { originalURL }: { originalURL: string } = ctx.request.body;
  let shortUrl: string | undefined;

  if (!originalURL) {
    ctx.status = 400;
    ctx.body = "Please provide a URL";
    return;
  }

  while (!urlDatabase[originalURL]) {
    shortUrl = shortid.generate();
    if (!urlDatabase[shortUrl]) {
      urlDatabase[shortUrl] = originalURL;
      urlDatabase[originalURL] = shortUrl;
    }
  }

  ctx.status = 200;
  ctx.body = { shortUrl: `${baseUrl}/${shortUrl ?? urlDatabase[originalURL]}` };
});

router.get("/:shortUrl", (ctx) => {
  const { shortUrl }: { shortUrl: string } = ctx.params;

  const longUrl = urlDatabase[shortUrl];

  if (longUrl) {
    const absoluteURL = /^(f|ht)tps?:\/\//i.test(longUrl)
      ? longUrl
      : `http://${longUrl}`;
    ctx.status = 301;
    ctx.redirect(absoluteURL);
  } else {
    ctx.status = 404;
    ctx.body = "Short URL not found";
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log(`Server ready ${baseUrl}`);
});
