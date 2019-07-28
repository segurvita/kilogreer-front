/**
 * 再認証処理
 */
const refreshAccessToken = () =>
  new Promise((resolve, reject) => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      // リフレッシュトークンからアクセストークンを取得する
      return window.axios
        .post('/refresh', {
          refresh_token: refreshToken,
        })
        .then((response) => {
          if (response.data.access_token) {
            sessionStorage.setItem('access_token', response.data.access_token);
          }
          if (response.data.refresh_token) {
            localStorage.setItem('refresh_token', response.data.refresh_token);
          }
          if (response.data.userid) {
            sessionStorage.setItem('userid', response.data.userid);
          }
          return resolve(response.data.access_token);
        })
        .catch(err => reject(err));
    }
    return reject('refresh_token is not found');
  });

/**
 * 認証済みか確認
 * @param {*} code 認証コード（null可）
 */
const isAuthenticated = (code = null) =>
  new Promise((resolve, reject) => {
    // セッションにaccess_tokenがあるか？
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      // access_tokenがあるなら何もせず終了
      return resolve(accessToken);
    }

    // アクセストークンがないならリフレッシュ
    return refreshAccessToken()
      .then(() =>
        // リフレッシュに成功したら終了
        resolve(accessToken),
      )
      .catch(() => {
        // リフレッシュに失敗したなら再取得

        // 引数にcodeがあるか？
        if (!code) {
          return reject('code is not found.');
        }

        // リフレッシュトークンを取得
        return window.axios
          .get('/token', { params: { code } })
          .then((response) => {
            if (response.data.access_token) {
              sessionStorage.setItem('access_token', response.data.access_token);
            }
            if (response.data.refresh_token) {
              localStorage.setItem('refresh_token', response.data.refresh_token);
            }
            if (response.data.userid) {
              sessionStorage.setItem('userid', response.data.userid);
            }
            return resolve(response.data.access_token);
          })
          .catch(err => reject(err));
      });
  });

/**
 * ログアウト処理
 */
const logout = () => {
  sessionStorage.removeItem('access_token');
};

export default { isAuthenticated, refreshAccessToken, logout };
