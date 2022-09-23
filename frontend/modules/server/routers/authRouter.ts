import { Router } from "express";
import { config, db, spotify } from "../../..";
import RandomKey from "../../util/randomKey";

const router = Router();

router.get("/login", (req, res) => {
  const state = RandomKey(16);
  const scopes = config.backend.scope.split(" ");

  const url = spotify.createAuthorizeURL(scopes, state);
  res.redirect(url);

  db.state.create({
    data: {
      state: state,
      expires: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
    },
  });
});

router.get("/callback", (req, res) => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  if (!code || !state) {
    res.status(400).send("Bad Request");
    return;
  }

  spotify.authorizationCodeGrant(code).then(
    async (data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotify.setAccessToken(access_token);
      spotify.setRefreshToken(refresh_token);

      db.state.deleteMany({
        where: {
          state: state,
        },
      });

      res.redirect("/");

      const user = (await spotify.getMe()).body

      await db.token.create({
        data: {
          accessToken: access_token,
          refreshToken: refresh_token,
          expires: new Date(Date.now() + expires_in * 1000),
          User: {
            connectOrCreate: {
                where: {
                    spotifyId: user.id,
                },
                create: {
                    username: user.display_name || user.id,
                    spotifyId: user.id
                }
            },
          },
        },
      });
    },
    (err) => {
      res.redirect("/?error=invalid_token");
    }
  );
});

export default router;
