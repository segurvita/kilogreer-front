import axios from 'axios';

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

    // 引数にcodeがあるか？
    if (!code) {
      return reject('code is not found.');
    }

    // アクセストークンを取得
    return axios
      .get(`${process.env.VUE_APP_API_HOST}/token?code=${code}`)
      .then((response) => {
        if (response.data.access_token) {
          sessionStorage.setItem('access_token', response.data.access_token);
        }
        if (response.data.refresh_token) {
          sessionStorage.setItem('refresh_token', response.data.refresh_token);
        }
        if (response.data.userid) {
          sessionStorage.setItem('userid', response.data.userid);
        }
        return resolve(response.data.access_token);
      })
      .catch(err => reject(err));
  });

export default { isAuthenticated };
